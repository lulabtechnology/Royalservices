import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.ADMIN_CLAIMS_SECRET;
  const headerSecret = req.headers.get("x-admin-claims-secret");

  if (!secret || headerSecret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const email = body?.email as string | undefined;

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const user = await adminAuth.getUserByEmail(email);
  await adminAuth.setCustomUserClaims(user.uid, { admin: true });

  return NextResponse.json({
    ok: true,
    message: "Custom claim set. User must sign out/in to refresh token."
  });
}
