import { Container } from "@/components/Container";

export default function CartPage() {
  return (
    <Container className="py-10 space-y-2">
      <h1 className="text-2xl font-semibold">Carrito</h1>
      <p className="text-gray-600">
        En FASE 3 implementamos carrito real (localStorage) + validaciones de stock.
      </p>
    </Container>
  );
}
