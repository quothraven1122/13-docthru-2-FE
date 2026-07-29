import { checkAuth } from "@/utils/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function AuthLayout({ children }) {
  const isAuthenticated = await checkAuth();

  if (isAuthenticated) {
    redirect("/challenges", RedirectType.replace);
  }

  return <>{children}</>;
}
