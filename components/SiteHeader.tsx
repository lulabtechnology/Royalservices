"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Lang } from "@/lib/types/catalog";
import { useCart } from "@/components/cart/CartProvider";

export function SiteHeader({ lang = "es" }: { lang?: Lang }) {
  const otherLang: Lang = lang === "es" ? "en" : "es";
  const { totalItems } = useCart();

  return (
    <header className="border-b border-surface bg-white">
      <Container className="py-4 flex items-center justify-between gap-4">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Royal Service PTY" width={160} height={40} priority />
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link href={`/${lang}`} className="hover:text-brand">
            {lang === "en" ? "Home" : "Inicio"}
          </Link>
          <Link href={`/${lang}/catalog`} className="hover:text-brand">
            {lang === "en" ? "Catalog" : "Catálogo"}
          </Link>
          <Link href={`/${lang}/contact`} className="hover:text-brand">
            {lang === "en" ? "Contact" : "Contacto"}
          </Link>
          <Link href={`/${lang}/policies`} className="hover:text-brand">
            {lang === "en" ? "Policies" : "Políticas"}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`/${lang}/cart`}
            className="inline-flex items-center justify-center rounded-xl border border-surface px-3 py-2 text-sm hover:bg-gray-50"
          >
            {lang === "en" ? "Cart" : "Carrito"} ({totalItems})
          </Link>

          <Link
            href={`/${otherLang}`}
            className="inline-flex items-center justify-center rounded-xl border border-surface px-3 py-2 text-sm hover:bg-gray-50"
            title={lang === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
          >
            {otherLang.toUpperCase()}
          </Link>
        </div>
      </Container>
    </header>
  );
}
