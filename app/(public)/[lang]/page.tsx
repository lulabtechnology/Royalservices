import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { t } from "@/lib/i18n/dict";
import { getActivePromotions } from "@/lib/catalog/public";
import { normalizeLang } from "@/lib/i18n/lang";

export default async function HomeLangPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const tr = t(lang);

  const promos = await getActivePromotions();

  return (
    <div>
      <section className="border-b border-surface">
        <Container className="py-10 grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-sm">
              Royal Service PTY
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {lang === "en"
                ? "Professional catalog and quote requests"
                : "Catálogo profesional y pedidos por WhatsApp"}
            </h1>

            <p className="text-base text-gray-600">
              {lang === "en"
                ? "Add products to the cart and send your request via WhatsApp or email."
                : "Agrega productos al carrito y envía tu pedido por WhatsApp o email."}
            </p>

            <div className="flex gap-3">
              <Link
                href={`/${lang}/catalog`}
                className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-white hover:bg-brand/90"
              >
                {tr.homeCta}
              </Link>
            </div>

            {promos.length > 0 && (
              <div className="mt-4 rounded-2xl border border-surface p-4">
                <p className="text-sm font-semibold">
                  {lang === "en" ? "Active promotions" : "Promociones activas"}
                </p>
                <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
                  {promos.slice(0, 3).map((p) => (
                    <li key={p.id}>
                      <span className="font-medium">{p.badgeText}</span>{" "}
                      {lang === "en" ? p.title.en : p.title.es}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-surface bg-gray-50">
            <Image
              src="/images/hero-banner.jpg"
              alt="Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
