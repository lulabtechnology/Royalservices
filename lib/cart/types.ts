export type CartLang = "es" | "en";

export type CartItem = {
  productId: string;
  slug: string;
  sku: string;
  name: { es: string; en: string };

  qty: number;

  // snapshot de stock (se refresca desde server)
  trackStock: boolean;
  stockQty: number;
  lowStockThreshold: number;
  allowBackorder: boolean;

  promoLabel?: "OFERTA" | "PROMO" | null;
  imageUrl?: string | null;
};

export type CartState = {
  items: CartItem[];
};
