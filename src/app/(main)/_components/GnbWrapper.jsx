"use client";

import { usePathname } from "next/navigation";
import Gnb from "@/components/Gnb";

export default function GnbWrapper() {
  const pathname = usePathname();
  const hideGNB = pathname.startsWith("/posts");

  if (hideGNB) return null;
  return <Gnb />;
}
