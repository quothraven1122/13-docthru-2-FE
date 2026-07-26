"use client";
import { usePathname } from "next/navigation";
import GnbWrapper from "./_components/GnbWrapper";
import { NO_GNB } from "@/constants/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const hasGNB = !NO_GNB.some(({ href }) => (href instanceof RegExp ? href.test(pathname) : href === path));
  return (
    <>
      {hasGNB && <GnbWrapper />}
      {children}
    </>
  );
}
