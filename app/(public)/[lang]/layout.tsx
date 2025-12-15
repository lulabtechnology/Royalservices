import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { normalizeLang } from "@/lib/i18n/lang";
import { CartProvider } from "@/components/cart/CartProvider";

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  if (rawLang !== lang) redirect("/es");

  return (
    <CartProvider>
      <SiteHeader lang={lang} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </CartProvider>
  );
}
