"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken(true);

      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "No autorizado (¿falta claim admin?)");
      }

      window.location.href = "/admin";
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Error");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <p className="text-sm text-gray-600 mt-1">
        Solo usuarios admin. Si te da “No autorizado”, falta asignar el claim <code>admin</code>.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            className="mt-1 w-full rounded-xl border border-surface px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            className="mt-1 w-full rounded-xl border border-surface px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        <button
          disabled={status === "loading"}
          className="w-full rounded-xl bg-brand px-4 py-2 text-white hover:bg-brand/90 disabled:opacity-60"
        >
          {status === "loading" ? "Entrando..." : "Entrar"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-600">Error: {errorMsg}</p>
        )}
      </form>
    </div>
  );
}
