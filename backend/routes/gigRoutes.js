import express from "express";
import {
    createGig,
    getGigs,
    getGigById,
} from "../controllers/gigController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", protect, createGig);
router.get("/:gigId", getGigById);

export default router;
