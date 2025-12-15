export async function getPublishedProducts() {
  // Trae hasta 200 productos (en este proyecto es más que suficiente)
  // y filtra "published" de forma tolerante (status / stuatus / espacios / mayúsculas).
  try {
    const snap = await adminDb
      .collection("products")
      .orderBy("updatedAt", "desc")
      .limit(200)
      .get();

    const all = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

    const published = all.filter((p) => {
      const raw = p.status ?? p.stuatus ?? "published";
      const norm = String(raw).trim().toLowerCase();
      return norm === "published";
    });

    return published;
  } catch {
    // Fallback si NO existe updatedAt en algunos docs (orderBy puede fallar)
    const snap = await adminDb.collection("products").limit(200).get();
    const all = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

    const published = all.filter((p) => {
      const raw = p.status ?? p.stuatus ?? "published";
      const norm = String(raw).trim().toLowerCase();
      return norm === "published";
    });

    return published;
  }
}
