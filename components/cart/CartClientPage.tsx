"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export function CartClientPage({ lang }: { lang: "es" | "en" }) {
  const { items, totalItems, updateQty, removeItem, clear, setStockSnapshot } = useCart();
  const [notice, setNotice] = useState<string | null>(null);

  const ids = useMemo(() => items.map((x) => x.productId), [items]);

  // refrescar stock actual desde server y ajustar
  useEffect(() => {
    if (!ids.length) return;

    (async () => {
      const res = await fetch("/api/catalog/products-by-ids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids })
      });

      const json = await res.json().catch(() => null);
      const map = json?.products || {};

      let adjusted = false;

      for (const it of items) {
        const s = map[it.productId];
        if (!s) continue;

        setStockSnapshot(it.productId, s);

        // si no backorder, clamp
        if (s.trackStock && !s.allowBackorder && it.qty > s.stockQty) {
          updateQty(it.productId, s.stockQty);
          adjusted = true;
        }
        if (s.trackStock && !s.allowBackorder && s.stockQty <= 0) {
          // si quedó agotado, updateQty lo eliminará (porque clamp a 0)
          updateQty(it.productId, 0);
          adjusted = true;
        }
      }

      if (adjusted) {
        setNotice(lang === "en" ? "Some quantities were adjusted due to stock." : "Algunas cantidades se ajustaron por stock.");
        setTimeout(() => setNotice(null), 2500);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  if (!items.length) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{lang === "en" ? "Cart" : "Carrito"}</h1>
        <p className="text-gray-600">{lang === "en" ? "Your cart is empty." : "Tu carrito está vacío."}</p>
        <Link className="text-brand hover:underline" href={`/${lang}/catalog`}>
          {lang === "en" ? "Go to catalog" : "Ir al catálogo"}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{lang === "en" ? "Cart" : "Carrito"}</h1>
          <p className="text-sm text-gray-600">
            {lang === "en" ? "Items:" : "Productos:"} {totalItems}
          </p>
        </div>

        <button
          onClick={clear}
          className="rounded-xl border border-surface px-3 py-2 text-sm hover:bg-gray-50"
        >
          {lang === "en" ? "Clear" : "Vaciar"}
        </button>
      </div>

      {notice ? <div className="rounded-xl border border-surface p-3 text-sm text-gray-700">{notice}</div> : null}

      <div className="rounded-2xl border border-surface overflow-hidden">
        <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium bg-gray-50">
          <div className="col-span-6">{lang === "en" ? "Product" : "Producto"}</div>
          <div className="col-span-3">{lang === "en" ? "Quantity" : "Cantidad"}</div>
          <div className="col-span-3 text-right">{lang === "en" ? "Actions" : "Acciones"}</div>
        </div>

        {items.map((it) => {
          const out = it.trackStock && !it.allowBackorder && it.stockQty <= 0;
          const low = it.trackStock && it.stockQty > 0 && it.stockQty <= it.lowStockThreshold;

          return (
            <div key={it.productId} className="grid grid-cols-12 gap-2 p-4 border-t border-surface items-center">
              <div className="col-span-6">
                <p className="font-medium">{lang === "en" ? it.name.en : it.name.es}</p>
                <p className="text-xs text-gray-600">{it.sku}</p>
                {out ? (
                  <p className="text-xs text-gray-600 mt-1">{lang === "en" ? "Out of stock" : "Agotado"}</p>
                ) : low ? (
                  <p className="text-xs text-gray-600 mt-1">{lang === "en" ? "Last units" : "Últimas unidades"}</p>
                ) : null}
              </div>

              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-lg border border-surface px-3 py-1 hover:bg-gray-50"
                    onClick={() => updateQty(it.productId, it.qty - 1)}
                  >
                    -
                  </button>
                  <input
                    className="w-14 rounded-lg border border-surface px-2 py-1 text-sm"
                    value={it.qty}
                    onChange={(e) => updateQty(it.productId, Number(e.target.value))}
                  />
                  <button
                    className="rounded-lg border border-surface px-3 py-1 hover:bg-gray-50"
                    onClick={() => updateQty(it.productId, it.qty + 1)}
                    disabled={it.trackStock && !it.allowBackorder && it.qty >= it.stockQty}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-span-3 text-right">
                <button
                  className="rounded-xl border border-surface px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={() => removeItem(it.productId)}
                >
                  {lang === "en" ? "Remove" : "Quitar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Link
          href={`/${lang}/catalog`}
          className="rounded-xl border border-surface px-4 py-2 text-sm hover:bg-gray-50"
        >
          {lang === "en" ? "Continue shopping" : "Seguir comprando"}
        </Link>

        <div className="text-sm text-gray-600 self-center">
          {lang === "en" ? "FASE 4: checkout + WhatsApp + email + save order" : "FASE 4: checkout + WhatsApp + email + guardar pedido"}
        </div>
      </div>
    </div>
  );
}
