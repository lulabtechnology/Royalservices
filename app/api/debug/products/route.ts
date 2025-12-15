import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function GET() {
  const snap = await adminDb.collection("products").limit(20).get();
  const sample = snap.docs.map((d) => {
    const data: any = d.data();
    return {
      id: d.id,
      status: data.status ?? null,
      stuatus: data.stuatus ?? null,
      slug: data.slug ?? null,
      nameEs: data?.name?.es ?? null
    };
  });
  return NextResponse.json({ count: snap.size, sample });
}
