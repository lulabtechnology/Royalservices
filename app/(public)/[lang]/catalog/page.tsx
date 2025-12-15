import Link from "next/link";
import { Container } from "@/components/Container";
import { getPublishedProducts, getVisibleCategories } from "@/lib/catalog/public";
import { normalizeLang } from "@/lib/i18n/lang";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CatalogLangPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

const [categories, products] = await Promise.all([
  getVisibleCategories(),
  getPublishedProducts()
]);

// 🚑 HOTFIX: mientras arreglamos categories/categoryId,
// no filtramos por categoryId para no ocultar todo.
const visibleProducts = products;


  return (
    <Container className="py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{lang === "en" ? "Catalog" : "Catálogo"}</h1>
        <p className="text-gray-600">
          {lang === "en" ? "Browse products and add to cart." : "Explora productos y agrégalos al carrito."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(categories.length ? categories : [
  { id: "equipos", name: { es: "Equipos", en: "Equipment" }, slug: "equipos" },
  { id: "implementos", name: { es: "Implementos", en: "Implements" }, slug: "implementos" },
  { id: "repuestos", name: { es: "Repuestos", en: "Spare parts" }, slug: "repuestos" }
]).map((c: any) => (

          <span key={c.id} className="rounded-full border border-surface px-3 py-1 text-sm">
            {lang === "en" ? c.name.en : c.name.es}
          </span>
        ))}
      </div>

     {visibleProducts.length === 0 ? (
  <div className="rounded-xl border border-surface p-4 text-sm text-gray-600">
    No hay productos publicados todavía.
  </div>
) : (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {visibleProducts.map((p: any) => (
      <div key={p.id} className="rounded-xl border border-surface p-4">
        <div className="text-xs text-gray-500">{p.sku ?? p.code ?? ""}</div>

        <div className="mt-1 text-lg font-semibold">
          <Link href={`/${lang}/product/${p.slug}`}>
            {p?.name?.[lang] ?? p?.name?.es ?? "Producto"}
          </Link>
        </div>

        <div className="mt-1 text-sm text-gray-600">
          {p?.shortDescription?.[lang] ?? p?.shortDescription?.es ?? ""}
        </div>

        <div className="mt-2 text-xs text-gray-500">
          categoryId: <span className="font-mono">{String(p.categoryId ?? "")}</span>
        </div>
      </div>
    ))}
  </div>
)}


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
