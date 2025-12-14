import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE_NAME, SESSION_EXPIRES_DAYS } from "@/lib/auth/constants";

export const runtime = "nodejs";

const expiresInMs = SESSION_EXPIRES_DAYS * 24 * 60 * 60 * 1000;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const idToken = body?.idToken as string | undefined;

  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
  }

  const decoded = await adminAuth.verifyIdToken(idToken);
  if (decoded.admin !== true) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }

  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: expiresInMs });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(expiresInMs / 1000)
  });

  return res;
}
