// services/urlService.ts
import { urlDatabase } from "../db";

function generateRandomCode(length: number = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  while (length--) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export function createShortUrl(
  originalUrl: string,
  validity: number,
  shortcode?: string
): { shortCode: string; expiry: number } {
  const now = Date.now();
  const expiry = now + validity * 60 * 1000; // minutes to ms

  // If shortcode provided
  if (shortcode) {
    if (urlDatabase[shortcode]) {
      throw new Error("Shortcode already exists");
    }
    urlDatabase[shortcode] = {
      originalUrl,
      expiry,
      createdAt: now,
      clicks: 0,
    };
    return { shortCode: shortcode, expiry };
  }

  // Generate a unique shortcode
  let newCode = "";
  do {
    newCode = generateRandomCode();
  } while (urlDatabase[newCode]);

  urlDatabase[newCode] = {
    originalUrl,
    expiry,
    createdAt: now,
    clicks: 0,
  };

  return { shortCode: newCode, expiry };
}

export function getOriginalUrl(shortcode: string): string {
  const entry = urlDatabase[shortcode];
  if (!entry) throw new Error("Shortcode not found");
  if (Date.now() > entry.expiry) throw new Error("Link expired");
  entry.clicks++;
  return entry.originalUrl;
}

export function getStats(shortcode: string) {
  const entry = urlDatabase[shortcode];
  if (!entry) throw new Error("Shortcode not found");

  return {
    originalUrl: entry.originalUrl,
    createdAt: new Date(entry.createdAt).toISOString(),
    expiry: new Date(entry.expiry).toISOString(),
    clicks: entry.clicks,
  };
}
