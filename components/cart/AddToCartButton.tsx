"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { CartItem } from "@/lib/cart/types";

type Props = {
  item: Omit<CartItem, "qty">;
  label: string;
  disabledLabel: string;
};

export function AddToCartButton({ item, label, disabledLabel }: Props) {
  const { addItem } = useCart();
  const [msg, setMsg] = useState<string | null>(null);

  const isDisabled = item.trackStock && !item.allowBackorder && item.stockQty <= 0;

  return (
    <div className="space-y-2">
      <button
        disabled={isDisabled}
        onClick={() => {
          const res = addItem(item, 1);
          setMsg(res.message ?? (res.ok ? "Agregado al carrito." : "No se pudo agregar."));
          setTimeout(() => setMsg(null), 1800);
        }}
        className={`w-full rounded-xl px-4 py-2 text-sm ${
          isDisabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-brand text-white hover:bg-brand/90"
        }`}
      >
        {isDisabled ? disabledLabel : label}
      </button>

      {msg ? <p className="text-xs text-gray-600">{msg}</p> : null}
    </div>
  );
}
