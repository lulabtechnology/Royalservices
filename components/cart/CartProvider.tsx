"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, CartState } from "@/lib/cart/types";
import { loadCart, saveCart } from "@/lib/cart/storage";

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => { ok: boolean; message?: string };
  updateQty: (productId: string, qty: number) => { ok: boolean; message?: string };
  removeItem: (productId: string) => void;
  clear: () => void;
  setStockSnapshot: (
    productId: string,
    stock: Pick<CartItem, "trackStock" | "stockQty" | "lowStockThreshold" | "allowBackorder">
  ) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function clampQty(item: Pick<CartItem, "trackStock" | "stockQty" | "allowBackorder">, qty: number) {
  const clean = Math.max(0, Math.floor(qty || 0));

  if (!item.trackStock) return Math.max(1, clean);

  // trackStock = true
  if (item.allowBackorder) return Math.max(1, clean);

  // no backorder
  if (item.stockQty <= 0) return 0;
  return Math.min(Math.max(1, clean), item.stockQty);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });

  // load on mount
  useEffect(() => {
    setState(loadCart());
  }, []);

  // persist
  useEffect(() => {
    saveCart(state);
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = state.items.reduce((sum, it) => sum + (it.qty || 0), 0);

    function addItem(item: Omit<CartItem, "qty">, qty = 1) {
      // si está agotado y no backorder
      if (item.trackStock && !item.allowBackorder && item.stockQty <= 0) {
        return { ok: false, message: "Producto agotado." };
      }

      let message: string | undefined;

      setState((prev) => {
        const existing = prev.items.find((x) => x.productId === item.productId);
        if (!existing) {
          const nextQty = clampQty(item, qty);
          if (nextQty === 0) {
            message = "Producto agotado.";
            return prev;
          }
          return { items: [...prev.items, { ...item, qty: nextQty }] };
        }

        const desired = (existing.qty || 0) + qty;
        const nextQty = clampQty(existing, desired);

        if (nextQty !== desired) {
          message = "Cantidad ajustada por stock disponible.";
        }

        return {
          items: prev.items.map((x) => (x.productId === item.productId ? { ...x, qty: nextQty } : x))
        };
      });

      return { ok: true, message };
    }

    function updateQty(productId: string, qty: number) {
      let message: string | undefined;

      setState((prev) => {
        const found = prev.items.find((x) => x.productId === productId);
        if (!found) return prev;

        const nextQty = clampQty(found, qty);

        if (nextQty === 0) {
          message = "Producto eliminado del carrito (agotado).";
          return { items: prev.items.filter((x) => x.productId !== productId) };
        }

        if (nextQty !== qty) {
          message = "Cantidad ajustada por stock disponible.";
        }

        return { items: prev.items.map((x) => (x.productId === productId ? { ...x, qty: nextQty } : x)) };
      });

      return { ok: true, message };
    }

    function removeItem(productId: string) {
      setState((prev) => ({ items: prev.items.filter((x) => x.productId !== productId) }));
    }

    function clear() {
      setState({ items: [] });
    }

    function setStockSnapshot(productId: string, stock: Pick<CartItem, "trackStock" | "stockQty" | "lowStockThreshold" | "allowBackorder">) {
      setState((prev) => ({
        items: prev.items.map((x) => (x.productId === productId ? { ...x, ...stock } : x))
      }));
    }

    return { items: state.items, totalItems, addItem, updateQty, removeItem, clear, setStockSnapshot };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
