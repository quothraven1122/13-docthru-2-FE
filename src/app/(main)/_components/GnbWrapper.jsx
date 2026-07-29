"use client";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";
import Gnb from "@/components/Gnb";
import ProfileDropdown from "@/components/ProfileDropdown";
import { NO_GNB } from "@/constants/navigation";
import { GRADE_LABEL, PROFILE_AVATAR_SRC } from "@/constants/profile";

export default function GnbWrapper() {
  const { user, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const hasGNB = !NO_GNB.some(({ href }) => (href instanceof RegExp ? href.test(pathname) : href === pathname));

  if (!hasGNB) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <Gnb
      isLoggedIn={!!user}
      role={user?.role?.toLowerCase()}
      isLoading={isLoading}
      profileMenu={
        user && (
          <ProfileDropdown
            avatarSrc={PROFILE_AVATAR_SRC[user.role]}
            name={user.nickname}
            role={GRADE_LABEL[user.grade]}
            myChallengeHref="/mypage"
            onLogout={handleLogout}
          />
        )
      }
    />
  );
}
