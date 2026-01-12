import express from "express";
import { createGig, getGigs } from "../controllers/gigController.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", createGig);

export default router;
