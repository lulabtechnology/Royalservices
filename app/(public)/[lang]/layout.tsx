import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Lang } from "@/lib/types/catalog";

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;

  return (
    <>
      <SiteHeader lang={lang} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
