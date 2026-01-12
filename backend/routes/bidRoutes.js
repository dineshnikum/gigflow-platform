import express from "express";
import {
    createBid,
    getBidsForGig,
    hireBid,
} from "../controllers/bidController.js";

const router = express.Router();

router.post("/", createBid);
router.get("/:gigId", getBidsForGig);
router.patch("/:bidId/hire", hireBid);

export default router;
