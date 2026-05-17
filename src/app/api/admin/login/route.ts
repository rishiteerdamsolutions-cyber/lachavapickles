import { NextRequest, NextResponse } from "next/server";
import { createAdminToken, isAdminConfigured, isAdminRequest } from "@/lib/admin-auth";

const COOKIE = "admin_session";
const MAX_AGE = 24 * 60 * 60;

function sessionCookie(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE,
  };
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    authenticated: isAdminRequest(req),
    configured: isAdminConfigured(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!isAdminConfigured()) {
      return NextResponse.json(
        {
          error:
            "Admin is not configured on the server. Add ADMIN_USERNAME and ADMIN_PASSWORD in Vercel → Project → Settings → Environment Variables, then redeploy.",
        },
        { status: 503 }
      );
    }

    const adminUser = process.env.ADMIN_USERNAME!;
    const adminPass = process.env.ADMIN_PASSWORD!;

    if (username !== adminUser || password !== adminPass) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createAdminToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(sessionCookie(token));
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
