import { Container } from "@/components/Container";
import { normalizeLang } from "@/lib/i18n/lang";

export default async function CartLangPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  return (
    <Container className="py-10 space-y-2">
      <h1 className="text-2xl font-semibold">{lang === "en" ? "Cart" : "Carrito"}</h1>
      <p className="text-gray-600">
        {lang === "en" ? "FASE 3: Real cart + stock validation." : "FASE 3: Carrito real + validaciones de stock."}
      </p>
    </Container>
  );
}
