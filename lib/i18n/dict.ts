import { Lang } from "@/lib/types/catalog";

export function t(lang: Lang) {
  const es = {
    homeCta: "Ver catálogo",
    catalogTitle: "Catálogo",
    contactTitle: "Contacto",
    policiesTitle: "Políticas",
    specsTitle: "Ficha técnica",
    downloadPdf: "Descargar ficha técnica (PDF)",
    sku: "Código/Referencia",
    outOfStock: "AGOTADO",
    lastUnits: "Últimas unidades",
    backorder: "Disponible bajo pedido"
  };

  const en = {
    homeCta: "View catalog",
    catalogTitle: "Catalog",
    contactTitle: "Contact",
    policiesTitle: "Policies",
    specsTitle: "Technical sheet",
    downloadPdf: "Download technical sheet (PDF)",
    sku: "Code/Reference",
    outOfStock: "OUT OF STOCK",
    lastUnits: "Last units",
    backorder: "Available on request"
  };

  return lang === "en" ? en : es;
}
