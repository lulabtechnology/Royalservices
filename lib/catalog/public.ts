import { adminDb } from "@/lib/firebase/admin";

// 🔥 HOTFIX: no dependemos de categories para listar productos.
// categories podrá arreglarse más adelante en Admin.

export async function getVisibleCategories() {
  try {
    const snap = await adminDb
      .collection("categories")
      .where("isVisible", "==", true)
      .orderBy("sortOrder", "asc")
      .get();

    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  } catch (e) {
    // Si categories está vacío o hay lío, devolvemos []
    return [];
  }
}

export async function getPublishedProducts() {
  try {
    // Si existe índice status+updatedAt, perfecto.
    // Si algunos docs no tienen updatedAt, Firestore igual los trae (los missing quedan al final/antes según orden).
    const snap = await adminDb
      .collection("products")
      .where("status", "==", "published")
      .orderBy("updatedAt", "desc")
      .get();

    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  } catch (e) {
    // Si por alguna razón falla el orderBy(updatedAt), hacemos fallback sin orderBy
    const snap = await adminDb
      .collection("products")
      .where("status", "==", "published")
      .get();

    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  }
}

export async function getPublishedProductBySlug(slug: string) {
  // Evitamos índice compuesto (status+slug) consultando solo por slug
  const snap = await adminDb
    .collection("products")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  const doc = snap.docs[0];
  if (!doc) return null;

  const data: any = doc.data();
  if (data?.status !== "published") return null;

  return { id: doc.id, ...data };
}

export async function getActivePromotions() {
  try {
    const snap = await adminDb
      .collection("promotions")
      .where("isActive", "==", true)
      .get();

    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  } catch (e) {
    return [];
  }
}
