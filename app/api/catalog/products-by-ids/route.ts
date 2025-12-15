import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const ids: string[] = Array.isArray(body?.ids) ? body.ids : [];

  if (!ids.length) {
    return NextResponse.json({ ok: true, products: {} });
  }

  // get products
  const refs = ids.map((id) => adminDb.collection("products").doc(String(id)));
  const snaps = await adminDb.getAll(...refs);

  const rawProducts = snaps
    .filter((s) => s.exists)
    .map((s) => ({ id: s.id, ...(s.data() as any) }));

  // fetch categories visibility
  const categoryIds = Array.from(new Set(rawProducts.map((p) => p.categoryId).filter(Boolean)));
  const catRefs = categoryIds.map((id) => adminDb.collection("categories").doc(String(id)));
  const catSnaps = catRefs.length ? await adminDb.getAll(...catRefs) : [];

  const catVisible = new Map<string, boolean>();
  for (const s of catSnaps) {
    if (!s.exists) continue;
    const d: any = s.data();
    catVisible.set(s.id, d?.isVisible === true);
  }

  const products: Record<
    string,
    {
      trackStock: boolean;
      stockQty: number;
      lowStockThreshold: number;
      allowBackorder: boolean;
    }
  > = {};

  for (const p of rawProducts) {
    // solo published + categoría visible
    if (p.status !== "published") continue;
    if (!catVisible.get(String(p.categoryId))) continue;

    products[p.id] = {
      trackStock: Boolean(p.trackStock),
      stockQty: Number(p.stockQty ?? 0),
      lowStockThreshold: Number(p.lowStockThreshold ?? 0),
      allowBackorder: Boolean(p.allowBackorder)
    };
  }

  return NextResponse.json({ ok: true, products });
}
