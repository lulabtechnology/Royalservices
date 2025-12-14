import Link from "next/link";
import { Container } from "@/components/Container";
import { getPublishedProducts, getVisibleCategories } from "@/lib/catalog/public";
import { Lang } from "@/lib/types/catalog";

export default async function CatalogLangPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;

  const [categories, products] = await Promise.all([
    getVisibleCategories(),
    getPublishedProducts()
  ]);

  const catMap = new Map(categories.map((c) => [c.id, c]));

  const visibleProducts = products.filter((p) => catMap.has(p.categoryId));

  return (
    <Container className="py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          {lang === "en" ? "Catalog" : "Catálogo"}
        </h1>
        <p className="text-gray-600">
          {lang === "en"
            ? "Browse products and open the technical sheet."
            : "Explora productos y abre la ficha técnica."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <span key={c.id} className="rounded-full border border-surface px-3 py-1 text-sm">
            {lang === "en" ? c.name.en : c.name.es}
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((p) => (
          <Link
            key={p.id}
            href={`/${lang}/product/${p.slug}`}
            className="rounded-2xl border border-surface p-5 hover:shadow-sm transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{lang === "en" ? p.name.en : p.name.es}</p>
                <p className="text-sm text-gray-600 mt-1">{p.sku}</p>
              </div>

              {p.promoLabel && (
                <span className="rounded-full bg-brand px-3 py-1 text-xs text-white">
                  {p.promoLabel}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-700 mt-3">
              {lang === "en" ? p.shortDescription.en : p.shortDescription.es}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
