import { redirect, RedirectType } from "next/navigation";
import { checkRole } from "@/utils/auth";

export default async function AdminLayout({ children }) {
  const role = await checkRole();
  if (role !== "ADMIN") {
    redirect("/challenges", RedirectType.replace);
  }
  return <>{children}</>;
}
