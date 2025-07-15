// routes/urlRoutes.ts
import express from "express";
import { createShortUrl, redirect, getStats } from "../controllers/urlController";

const router = express.Router();

router.post("/shorturls", createShortUrl);
router.get("/shorturls/:shortcode", getStats);
router.get("/:shortcode", redirect);

export default router;
