import { Container } from "@/components/Container";
import { Lang } from "@/lib/types/catalog";

export default async function CartLangPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;

  return (
    <Container className="py-10 space-y-2">
      <h1 className="text-2xl font-semibold">{lang === "en" ? "Cart" : "Carrito"}</h1>
      <p className="text-gray-600">
        {lang === "en"
          ? "FASE 3: Real cart + stock validation."
          : "FASE 3: Carrito real + validaciones de stock."}
      </p>
    </Container>
  );
}
