import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    hasPublicConfig: Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    hasAdminConfig: Boolean(process.env.FIREBASE_PROJECT_ID)
  });
}
