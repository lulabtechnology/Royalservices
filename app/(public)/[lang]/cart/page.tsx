import { Container } from "@/components/Container";
import { normalizeLang } from "@/lib/i18n/lang";
import { CartClientPage } from "@/components/cart/CartClientPage";

export default async function CartLangPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  return (
    <Container className="py-10">
      <CartClientPage lang={lang} />
    </Container>
  );
}
