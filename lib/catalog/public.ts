import { adminDb } from "@/lib/firebase/admin";

function isPublishedProduct(p: any) {
  // tolerante: status / stuatus / espacios / mayúsculas
  const raw = p?.status ?? p?.stuatus ?? "";
  return String(raw).trim().toLowerCase() === "published";
}

export async function getVisibleCategories() {
  try {
    const snap = await adminDb
      .collection("categories")
      .where("isVisible", "==", true)
      .orderBy("sortOrder", "asc")
      .get();

    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  } catch {
    // fallback sin orderBy (por si falta índice o hay lío)
    try {
      const snap = await adminDb
        .collection("categories")
        .where("isVisible", "==", true)
        .get();

      const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      items.sort((a, b) => Number(a.sortOrder ?? 999) - Number(b.sortOrder ?? 999));
      return items;
    } catch {
      return [];
    }
  }
}

export async function getPublishedProducts() {
  // 🔥 HOTFIX: no dependemos de where(status=="published") porque
  // si algún doc tiene "stuatus" o status mal, quedaría fuera.
  // Traemos y filtramos en servidor (hasta 200).
  try {
    const snap = await adminDb
      .collection("products")
      .orderBy("updatedAt", "desc")
      .limit(200)
      .get();

    const all = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
    return all.filter(isPublishedProduct);
  } catch {
    const snap = await adminDb.collection("products").limit(200).get();
    const all = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
    return all.filter(isPublishedProduct);
  }
}

export async function getPublishedProductBySlug(slug: string) {
  const snap = await adminDb
    .collection("products")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  const doc = snap.docs[0];
  if (!doc) return null;

  const data: any = doc.data();
  if (!isPublishedProduct(data)) return null;

  return { id: doc.id, ...data };
}

export async function getActivePromotions() {
  try {
    const snap = await adminDb
      .collection("promotions")
      .where("isActive", "==", true)
      .get();

    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  } catch {
    return [];
  }
}
