export interface ShortUrlEntry {
  originalUrl: string;
  expiry: number;
  createdAt: number;
  clicks: number;
}

export const urlDatabase: Record<string, ShortUrlEntry> = {};
