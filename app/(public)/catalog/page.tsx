import { Container } from "@/components/Container";

export default function CatalogPage() {
  return (
    <Container className="py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Catálogo</h1>
        <p className="text-gray-600">
          En FASE 2 esto se llena desde Firestore (categorías + productos + promos).
        </p>
      </div>

      <div className="rounded-2xl border border-surface p-5 bg-white">
        <p className="text-sm text-gray-700">
          Placeholder de lista de productos (grid).
        </p>
      </div>
    </Container>
  );
}
