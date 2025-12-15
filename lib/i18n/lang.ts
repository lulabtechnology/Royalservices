import { Lang } from "@/lib/types/catalog";

export function isLang(v: string): v is Lang {
  return v === "es" || v === "en";
}

export function normalizeLang(v: string): Lang {
  return isLang(v) ? v : "es";
}
