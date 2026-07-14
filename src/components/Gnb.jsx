"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_NAV_TABS } from "@/constants/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function Gnb({
  isLoggedIn = false,
  role = "member",
  hasNotification = false,
  profileMenu = null,
  onProfileClick,
}) {
  const pathname = usePathname();
  const isAdmin = isLoggedIn && role === "admin";
  const isMember = isLoggedIn && role === "member";

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  useClickOutside(profileRef, () => setIsProfileOpen(false));

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev);
    onProfileClick?.();
  };

  return (
    <header className="h-14 w-full border-b border-[#F5F5F5] bg-white md:h-[60px]">
      <div className="mx-auto flex h-full items-center justify-between px-4 md:px-6 lg:max-w-[1200px] lg:px-0">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="relative block h-[18px] w-20 shrink-0 md:h-[27px] md:w-[120px]">
            <Image src="/logos/logo.svg" alt="Docthru" fill className="object-contain" />
          </Link>

          {isAdmin && (
            <nav className="flex items-start">
              {ADMIN_NAV_TABS.map((tab) => {
                const isActive = pathname?.startsWith(tab.href);
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`flex h-14 items-center justify-center px-2 text-[13px] md:h-[60px] md:px-[17px] md:text-[15px] ${
                      isActive ? "font-bold text-gray-800" : "font-semibold text-gray-500"
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {!isLoggedIn && (
          <Link
            href="/login"
            className="flex h-8 shrink-0 items-center justify-center rounded-[10px] border border-gray-800 px-4 text-sm font-semibold text-gray-800 md:h-10 md:rounded-xl md:text-base"
          >
            로그인
          </Link>
        )}

        {isMember && (
          <div className="flex shrink-0 items-center gap-4">
            <button type="button" aria-label="알림">
              <Image
                src={hasNotification ? "/icons/ic_bell_noti.svg" : "/icons/ic_bell_empty.svg"}
                alt=""
                width={24}
                height={24}
              />
            </button>
            <div ref={profileRef} className="relative">
              <button type="button" onClick={handleProfileClick} aria-label="프로필 메뉴">
                <Image src="/images/img_profile_member.svg" alt="" width={32} height={32} />
              </button>
              {isProfileOpen && profileMenu && (
                <div className="absolute top-full right-0 z-10 mt-2">{profileMenu}</div>
              )}
            </div>
          </div>
        )}

        {/* 어드민은 벨 아이콘 없음(디자인 의도) */}
        {isAdmin && (
          <div ref={profileRef} className="relative shrink-0">
            <button type="button" onClick={handleProfileClick} aria-label="프로필 메뉴">
              <Image src="/images/img_profile_admin.svg" alt="" width={32} height={32} />
            </button>
            {isProfileOpen && profileMenu && (
              <div className="absolute top-full right-0 z-10 mt-2">{profileMenu}</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
