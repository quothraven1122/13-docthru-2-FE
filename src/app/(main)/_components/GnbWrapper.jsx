"use client";

import { usePathname } from "next/navigation";
import Gnb from "@/components/Gnb";
import { useAuth } from "@/providers/AuthProvider";

export default function GnbWrapper() {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const hideGNB = pathname.startsWith("/posts");

  if (hideGNB) return null;
  return <Gnb isLoggedIn={!!user} role={user?.role?.toLowerCase()} isLoading={isLoading} />;
}
