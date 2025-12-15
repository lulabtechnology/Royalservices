import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getPublishedProductBySlug } from "@/lib/catalog/public";
import { t } from "@/lib/i18n/dict";
import { normalizeLang } from "@/lib/i18n/lang";

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = normalizeLang(rawLang);
  const tr = t(lang);

  const product = await getPublishedProductBySlug(slug);
  if (!product) return notFound();

  return (
    <Container className="py-10 space-y-6">
      <Link href={`/${lang}/catalog`} className="text-sm text-brand hover:underline">
        ← {lang === "en" ? "Back to catalog" : "Volver al catálogo"}
      </Link>

      <div className="rounded-2xl border border-surface p-6 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">
              {lang === "en" ? product.name.en : product.name.es}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {tr.sku}: <span className="font-medium">{product.sku}</span>
            </p>
          </div>

          {product.promoLabel && (
            <span className="rounded-full bg-brand px-3 py-1 text-xs text-white">
              {product.promoLabel}
            </span>
          )}
        </div>

        <p className="text-gray-700">
          {lang === "en" ? product.shortDescription.en : product.shortDescription.es}
        </p>
      </div>

      <div className="rounded-2xl border border-surface p-6">
        <h2 className="text-lg font-semibold">{tr.specsTitle}</h2>

        {product.specs?.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((row, idx) => (
                  <tr key={idx} className="border-t border-surface">
                    <td className="py-2 pr-4 text-gray-600 w-1/3">{row.label}</td>
                    <td className="py-2 text-gray-900">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-600 mt-2">
            {lang === "en" ? "No specifications yet." : "Aún no hay especificaciones."}
          </p>
        )}

        {product.pdfUrl ? (
          <div className="mt-4">
            <a
              href={product.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-white hover:bg-brand/90"
            >
              {tr.downloadPdf}
            </a>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
