import Gig from "../models/Gig.js";

// get gigs
export const getGigs = async (req, res) => {
    try {
        const { search } = req.query;

        const filter = {
            status: "open",
            ...(search && { title: { $text: { $search: search } } })
        }

        const gigs = await Gig.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, gigs });
    } catch (error) {
        console.error("Error fetching gigs:", error);
        return res.status(500).json({
            success: false,
            message: "failed to fetch gigs",
        });
    }
};

// create gig
export const createGig = async (req, res) => {
    const { title, description, budget } = req.body;
    const ownerId = req.user.userId;

    if (!title || !description || !budget) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        const gig = await Gig.create({
            title,
            description,
            budget,
            ownerId,
        });
        return res.status(201).json({ success: true, gig });
    } catch (error) {
        console.error("Error creating gig:", error);
        return res.status(500).json({
            success: false,
            message: "failed to create gig",
        });
    }
};
