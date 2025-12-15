import { Container } from "@/components/Container";
import { Lang } from "@/lib/types/catalog";

export default async function PoliciesLangPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;

  return (
    <Container className="py-10 space-y-4">
      <h1 className="text-2xl font-semibold">{lang === "en" ? "Policies" : "Políticas"}</h1>

      <div className="rounded-2xl border border-surface p-5 space-y-2 text-gray-700">
        <p>
          {lang === "en"
            ? "Place your privacy, warranty and returns policies here."
            : "Aquí van tus políticas de privacidad, devoluciones, garantías, etc."}
        </p>
        <p className="text-sm text-gray-500">
          {lang === "en"
            ? "(In FASE 5 we will make this editable from the admin panel.)"
            : "(En FASE 5 esto lo hacemos editable desde el panel admin.)"}
        </p>
      </div>
    </Container>
  );
}
