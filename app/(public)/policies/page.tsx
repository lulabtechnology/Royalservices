import { Container } from "@/components/Container";

export default function PoliciesPage() {
  return (
    <Container className="py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Políticas</h1>
      <div className="rounded-2xl border border-surface p-5 space-y-2 text-gray-700">
        <p>
          Aquí van tus políticas de privacidad, devoluciones, garantías, etc.
        </p>
        <p className="text-sm text-gray-500">
          (En FASE 5 esto lo hacemos editable desde el panel admin.)
        </p>
      </div>
    </Container>
  );
}
