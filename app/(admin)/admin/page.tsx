"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function AdminHomePage() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    await signOut(auth);
    window.location.href = "/";
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Panel Admin (base)</h1>
      <p className="text-gray-600">
        En FASE 5 aquí construimos el CRUD completo (categorías/productos/promos/settings).
      </p>

      <button
        onClick={logout}
        className="rounded-xl border border-surface px-4 py-2 hover:bg-gray-50"
      >
        Logout
      </button>
    </div>
  );
}
