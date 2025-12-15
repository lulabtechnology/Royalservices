import { CartState } from "@/lib/cart/types";

const KEY = "rs_cart_v1";

export function loadCart(): CartState {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    return { items: parsed.items };
  } catch {
    return { items: [] };
  }
}

export function saveCart(state: CartState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}
