import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import { Category, Lang, Product, Promotion } from "@/lib/types/catalog";

function isLang(x: string): x is Lang {
  return x === "es" || x === "en";
}

export async function getVisibleCategories(): Promise<Category[]> {
  const snap = await adminDb
    .collection("categories")
    .where("isVisible", "==", true)
    .orderBy("sortOrder", "asc")
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function getPublishedProducts(): Promise<Product[]> {
  const snap = await adminDb
    .collection("products")
    .where("status", "==", "published")
    .orderBy("updatedAt", "desc")
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function getPublishedProductBySlug(slug: string): Promise<Product | null> {
  const snap = await adminDb
    .collection("products")
    .where("slug", "==", slug)
    .where("status", "==", "published")
    .limit(1)
    .get();

  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...(doc.data() as any) };
}

export async function getActivePromotions(now = new Date()): Promise<Promotion[]> {
  // Simple: traemos activos y filtramos fechas en app (porque Firestore queries con null/optional complican)
  const snap = await adminDb
    .collection("promotions")
    .where("isActive", "==", true)
    .get();

  const msNow = now.getTime();

  const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Promotion[];

  return items.filter((p) => {
    const start = p.startAt?.toDate?.()?.getTime?.() ?? null;
    const end = p.endAt?.toDate?.()?.getTime?.() ?? null;

    if (start && msNow < start) return false;
    if (end && msNow > end) return false;
    return true;
  });
}
