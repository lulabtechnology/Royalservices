import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-surface">
        <Container className="py-10 grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-sm">
              Catálogo + Carrito (sin pago)
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Royal Service PTY
            </h1>

            <p className="text-base text-gray-600">
              Equipos, implementos y repuestos. Cotiza rápido: arma tu carrito y envía el
              pedido por WhatsApp o email.
            </p>

            <div className="flex gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-white hover:bg-brand/90"
              >
                Ver catálogo
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-surface px-4 py-2 hover:bg-gray-50"
              >
                Contacto
              </Link>
            </div>

            <p className="text-sm text-gray-500">
              * En FASE 1 conectamos Firebase y en FASE 5 agregamos el panel admin.
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-surface bg-gray-50">
            {/* Tú subirás esta imagen después */}
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

      {/* Secciones rápidas */}
      <section>
        <Container className="py-10">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-surface p-5">
              <h3 className="font-semibold">Equipos</h3>
              <p className="text-sm text-gray-600 mt-1">
                Catálogo profesional con fichas técnicas.
              </p>
            </div>
            <div className="rounded-2xl border border-surface p-5">
              <h3 className="font-semibold">Implementos</h3>
              <p className="text-sm text-gray-600 mt-1">
                Promos por temporada tipo OFERTA/PROMO.
              </p>
            </div>
            <div className="rounded-2xl border border-surface p-5">
              <h3 className="font-semibold">Repuestos</h3>
              <p className="text-sm text-gray-600 mt-1">
                Control de stock y alertas (FASE 6).
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
