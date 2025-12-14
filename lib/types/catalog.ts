export type Lang = "es" | "en";

export type ProductStatus = "draft" | "published" | "hidden" | "archived";

export type SpecRow = {
  label: string;
  value: string;
};

export type Category = {
  id: string;
  name: { es: string; en: string };
  slug: string;
  isVisible: boolean;
  sortOrder: number;
  createdAt?: any;
  updatedAt?: any;
};

export type Product = {
  id: string;
  name: { es: string; en: string };
  slug: string;
  sku: string; // Código/Referencia
  shortDescription: { es: string; en: string };
  categoryId: string;

  status: ProductStatus;

  // imágenes y ficha técnica
  imageUrls: string[]; // 0..3
  pdfUrl?: string | null;

  // specs
  specs: SpecRow[];

  // stock fields (en FASE 6 lo haremos pro con movimientos)
  trackStock: boolean;
  stockQty: number;
  lowStockThreshold: number;
  allowBackorder: boolean;

  promoLabel?: "OFERTA" | "PROMO" | null;

  createdAt?: any;
  updatedAt?: any;
};

export type Promotion = {
  id: string;
  title: { es: string; en: string };
  badgeText: "OFERTA" | "PROMO";
  isActive: boolean;
  startAt?: any | null; // Firestore Timestamp
  endAt?: any | null;
  createdAt?: any;
};

export type SiteSettings = {
  id: "main";
  contact: {
    whatsappDisplay: string;
    whatsappE164: string;
    email: string;
    instagram: string;
  };
  texts: {
    policiesEs: string;
    policiesEn: string;
  };
};
