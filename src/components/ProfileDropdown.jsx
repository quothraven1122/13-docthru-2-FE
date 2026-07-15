"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProfileDropdown({ avatarSrc, name, role, myChallengeHref = "#", onLogout }) {
  return (
    <div className="w-[292px] rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
      {/* 프로필  */}
      <div className="flex items-center gap-3 pb-4">
        <Image src={avatarSrc} alt="" width={32} height={32} className="rounded-full" />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* 메뉴 */}
      <div className="flex flex-col gap-1 pt-4">
        <Link href={myChallengeHref} className="text-sm font-medium text-gray-600 hover:text-gray-600">
          나의 챌린지
        </Link>
        <button type="button" onClick={onLogout} className="text-left text-sm text-gray-400 hover:text-gray-600">
          로그아웃
        </button>
      </div>
    </div>
  );
}
