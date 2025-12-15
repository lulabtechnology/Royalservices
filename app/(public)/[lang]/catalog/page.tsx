import Link from "next/link";
import { Container } from "@/components/Container";
import { getPublishedProducts, getVisibleCategories } from "@/lib/catalog/public";
import { normalizeLang } from "@/lib/i18n/lang";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export default async function CatalogLangPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const [categories, products] = await Promise.all([getVisibleCategories(), getPublishedProducts()]);
  const catMap = new Map(categories.map((c) => [c.id, c]));
  const visibleProducts = products.filter((p) => catMap.has(p.categoryId));

  return (
    <Container className="py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{lang === "en" ? "Catalog" : "Catálogo"}</h1>
        <p className="text-gray-600">
          {lang === "en" ? "Browse products and add to cart." : "Explora productos y agrégalos al carrito."}
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
        {visibleProducts.map((p) => {
          const isOut = p.trackStock && !p.allowBackorder && Number(p.stockQty ?? 0) <= 0;
          const isLow = p.trackStock && Number(p.stockQty ?? 0) > 0 && Number(p.stockQty ?? 0) <= Number(p.lowStockThreshold ?? 0);

          const cartItem = {
            productId: p.id,
            slug: p.slug,
            sku: p.sku,
            name: p.name,
            trackStock: Boolean(p.trackStock),
            stockQty: Number(p.stockQty ?? 0),
            lowStockThreshold: Number(p.lowStockThreshold ?? 0),
            allowBackorder: Boolean(p.allowBackorder),
            promoLabel: p.promoLabel ?? null,
            imageUrl: (p.imageUrls?.[0] as string | undefined) ?? null
          };

          return (
            <div key={p.id} className="rounded-2xl border border-surface p-5 hover:shadow-sm transition">
              <Link href={`/${lang}/product/${p.slug}`} className="block">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{lang === "en" ? p.name.en : p.name.es}</p>
                    <p className="text-sm text-gray-600 mt-1">{p.sku}</p>
                  </div>

                  {p.promoLabel ? (
                    <span className="rounded-full bg-brand px-3 py-1 text-xs text-white">{p.promoLabel}</span>
                  ) : null}
                </div>

                <p className="text-sm text-gray-700 mt-3">{lang === "en" ? p.shortDescription.en : p.shortDescription.es}</p>

                <div className="mt-3 flex gap-2">
                  {isOut ? (
                    <span className="rounded-full border border-surface px-3 py-1 text-xs text-gray-700">AGOTADO</span>
                  ) : isLow ? (
                    <span className="rounded-full border border-surface px-3 py-1 text-xs text-gray-700">
                      {lang === "en" ? "Last units" : "Últimas unidades"}
                    </span>
                  ) : null}
                </div>
              </Link>

              <div className="mt-4">
                <AddToCartButton
                  item={cartItem}
                  label={lang === "en" ? "Add to cart" : "Agregar al carrito"}
                  disabledLabel={lang === "en" ? "Out of stock" : "Agotado"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
