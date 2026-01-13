import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

// @desc    Create a bid
// @route   POST /api/bids
// @access  Private
export const createBid = async (req, res) => {
    const { gigId, message, price } = req.body;
    const freeLancerId = req.user.userId;

    if (!gigId || !message || !price) {
        return res.status(400).json({
            success: false,
            message: "Gig ID, message, and price are required",
        });
    }

    try {
        const bid = await Bid.create({ gigId, message, price, freeLancerId });
        return res.status(201).json({ success: true, bid });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to create bid" });
    }
};

// @desc    Get bids for a gig
// @route   GET /api/bids/:gigId
// @access  Private
export const getBidsForGig = async (req, res) => {
    const { gigId } = req.params;
    const userId = req.user.userId;

    try {
        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res
                .status(404)
                .json({ success: false, message: "Gig not found" });
        }

        const gigOwner = gig.ownerId.toString();
        if (gigOwner !== userId) {
            return res.status(403).json({
                success: false,
                message: "You're not authorized to view these bids",
            });
        }

        const bids = await Bid.find({ gigId });
        return res.status(200).json({ success: true, bids });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to get bids for gig" });
    }
};

// @desc    Hire a bid
// @route   PATCH /api/bids/:bidId/hire
// @access  Private
export const hireBid = async (req, res) => {
    const { bidId } = req.params;
    const userId = req.user.userId;

    try {
        const bid = await Bid.findById(bidId);
        if (!bid) {
            return res
                .status(404)
                .json({ success: false, message: "Bid not found" });
        }

        const gig = await Gig.findById(bid.gigId);
        if (!gig) {
            return res
                .status(404)
                .json({ success: false, message: "Gig not found" });
        }

        if (gig.ownerId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You're not authorized to hire this bid",
            });
        }

        bid.status = "hired";
        await bid.save();

        gig.status = "assigned";
        await gig.save();

        await Bid.updateMany(
            { gigId: bid.gigId, _id: { $ne: bidId } },
            { status: "rejected" }
        );

        return res.status(200).json({ success: true, bid });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to hire bid" });
    }
};
