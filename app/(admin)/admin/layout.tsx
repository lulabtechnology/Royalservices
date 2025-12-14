import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;

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
