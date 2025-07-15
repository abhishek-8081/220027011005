
import { Request, Response } from "express";
import * as service from "../services/urlService";
import { Log } from "../../../LoggingMiddleware/logger"; 

export async function createShortUrl(req: Request, res: Response) {
  try {
    const { url, validity = 30, shortcode } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const { shortCode, expiry } = service.createShortUrl(url, validity, shortcode);

    await Log("backend", "info", "controller", `Shortened URL created: ${shortCode}`);

    return res.status(201).json({
      shortLink: `http://localhost:3000/${shortCode}`,
      expiry: new Date(expiry).toISOString(),
    });
  } catch (error: any) {
    await Log("backend", "error", "controller", error.message);
    return res.status(400).json({ error: error.message });
  }
}

export async function redirect(req: Request, res: Response) {
  const shortcode = req.params.shortcode;
  try {
    const originalUrl = service.getOriginalUrl(shortcode);
    await Log("backend", "info", "controller", `Redirected to ${originalUrl}`);
    return res.redirect(originalUrl);
  } catch (error: any) {
    await Log("backend", "error", "controller", error.message);
    return res.status(404).json({ error: error.message });
  }
}

export async function getStats(req: Request, res: Response) {
  const shortcode = req.params.shortcode;
  try {
    const stats = service.getStats(shortcode);
    await Log("backend", "info", "controller", `Stats retrieved for ${shortcode}`);
    return res.status(200).json(stats);
  } catch (error: any) {
    await Log("backend", "error", "controller", error.message);
    return res.status(404).json({ error: error.message });
  }
}
