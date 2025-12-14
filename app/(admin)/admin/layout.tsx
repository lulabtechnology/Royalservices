import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

// Asegura que esta zona sea dinámica (admin + cookies)
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies(); // ✅ Next 15/16: cookies() es async
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    redirect("/admin/login");
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (decoded.admin !== true) {
      redirect("/admin/login");
    }
  } catch {
    redirect("/admin/login");
  }

  return <div className="min-h-screen">{children}</div>;
}
