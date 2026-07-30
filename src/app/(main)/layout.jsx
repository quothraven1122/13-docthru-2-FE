import { redirect, RedirectType } from "next/navigation";
import GnbWrapper from "./_components/GnbWrapper";
import { checkAuth } from "@/utils/auth";

export default async function MainLayout({ children }) {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect("/login", RedirectType.replace);
  }

  return (
    <>
      <GnbWrapper />
      {children}
    </>
  );
}
