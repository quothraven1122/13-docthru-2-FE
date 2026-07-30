"use client";

import { usePathname, useRouter } from "next/navigation";
import Gnb from "@/components/Gnb";
import ProfileDropdown from "@/components/ProfileDropdown";
import { GRADE_LABEL, PROFILE_AVATAR_SRC } from "@/constants/profile";
import { useAuth } from "@/providers/AuthProvider";

export default function GnbWrapper() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isPending, logout } = useAuth();
  const hideGNB = pathname.startsWith("/posts");

  if (hideGNB) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <Gnb
      isLoggedIn={!!user}
      role={user?.role?.toLowerCase()}
      isLoading={isPending}
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
