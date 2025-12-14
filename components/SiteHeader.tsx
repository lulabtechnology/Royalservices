import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";

export function SiteHeader() {
  return (
    <header className="border-b border-surface bg-white">
      <Container className="py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          {/* Tú subirás el logo luego */}
          <Image
            src="/images/logo.png"
            alt="Royal Service PTY"
            width={160}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link href="/" className="hover:text-brand">
            Inicio
          </Link>
          <Link href="/catalog" className="hover:text-brand">
            Catálogo
          </Link>
          <Link href="/contact" className="hover:text-brand">
            Contacto
          </Link>
          <Link href="/policies" className="hover:text-brand">
            Políticas
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="inline-flex items-center justify-center rounded-xl border border-surface px-3 py-2 text-sm hover:bg-gray-50"
          >
            Carrito (0)
          </Link>
        </div>
      </Container>
    </header>
  );
}
