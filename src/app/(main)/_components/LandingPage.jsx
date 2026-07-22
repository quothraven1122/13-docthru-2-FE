import Image from "next/image";
import Link from "next/link";
import React from "react";

import LandingFeatureSection from "./LandingFeatureSection";

const FEATURE_SECTIONS = [
  {
    icon: "/icons/ic_trophy.svg",
    title: "혼자서는 막막했던 번역,\n챌린지로 함께 완성하기",
    description: "중요한 건 꺾이지 않는 마음! 동료들과 함께\n기술 문서를 번역해 보세요.",
    imgSm: "/landing/landing_img1_sm.png",
    imgLg: "/landing/landing_img1_lg.png",
    imgSize: { sm: { width: 343, height: 277 }, lg: { width: 570, height: 411 } },
    imgAlt: "챌린지 목록 미리보기",
  },
  {
    icon: "/icons/ic_heart_black.svg",
    title: "내가 좋아하는 기술 번역,\n내가 필요한 기술 번역",
    description: "이미 진행 중인 번역 챌린지에 참여하거나,\n새로운 번역 챌린지를 시작해 보세요.",
    imgSm: "/landing/landing_img2_sm.png",
    imgLg: "/landing/landing_img2_lg.png",
    imgSize: { sm: { width: 375, height: 300 }, lg: { width: 570, height: 455 } },
    imgAlt: "챌린지 상세 미리보기",
  },
  {
    icon: "/icons/ic_commnet.svg",
    title: "피드백으로 함께 성장하기",
    description: "번역 작업물에 대해 피드백을 주고 받으며\n영어 실력은 물론, 개발 실력까지 키워보세요.",
    imgSm: "/landing/landing_img3_sm.png",
    imgLg: "/landing/landing_img3_lg.png",
    imgSize: { sm: { width: 343, height: 235 }, lg: { width: 505, height: 346 } },
    imgAlt: "피드백 미리보기",
  },
];

export default function LandingPage() {
  return (
    <main>
      <div className="bg-brand-dark">
        <section className="h-69.5 md:h-69.5 max-w-93.75 md:max-w-186 lg:max-w-[1920px] mx-auto flex flex-col items-center justify-center gap-6 bg-landing-bg-sm md:bg-landing-bg-md lg:bg-landing-bg-lg bg-cover bg-center bg-no-repeat">
          <Image alt="로고 이미지" src="/logos/logo.svg" width={126} height={28} className="h-7 w-31.5" />

          <p className="text-center text-lg font-bold text-white md:text-xl">
            함께 번역하며 성장하는
            <br />
            개발자의 새로운 영어 습관
          </p>

          <Link href="/challenges" className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900">
            번역 시작하기
          </Link>
        </section>
      </div>

      <div className="mx-auto divide-y divide-dashed divide-gray-200 max-w-85.5 md:max-w-151.75 lg:max-w-247.75">
        {FEATURE_SECTIONS.map((section) => (
          <LandingFeatureSection key={section.imgAlt} {...section} />
        ))}
      </div>

      <section className="px-4 py-16 text-center">
        <p className="text-[1.125rem] font-semibold text-gray-900">함께 번역하고 성장하세요!</p>

        <Link
          href="/challenges"
          className="mt-6 inline-block rounded-xl bg-gray-900 px-6 py-2.5 font-semibold text-[1rem] text-white"
        >
          번역 시작하기
        </Link>
      </section>
    </main>
  );
}
