import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { normalizeLang } from "@/lib/i18n/lang";

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  // Si alguien visita /fr o algo raro, lo mandamos a /es
  if (rawLang !== lang) {
    redirect("/es");
  }

  return (
    <>
      <SiteHeader lang={lang} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
