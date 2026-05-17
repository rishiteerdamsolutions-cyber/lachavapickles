import { NextRequest } from "next/server";
import crypto from "crypto";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "";
const SESSION_SECRET = process.env.SESSION_SECRET || "lachava-admin-secret";

export function createAdminToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(timestamp + ADMIN_USERNAME)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

export function verifyAdminToken(token: string): boolean {
  try {
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;
    const expected = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(timestamp + ADMIN_USERNAME)
      .digest("hex");
    if (signature !== expected) return false;
    return Date.now() - parseInt(timestamp, 10) < 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function isAdminRequest(req: NextRequest): boolean {
  const token = req.cookies.get("admin_session")?.value;
  return !!token && verifyAdminToken(token);
}
