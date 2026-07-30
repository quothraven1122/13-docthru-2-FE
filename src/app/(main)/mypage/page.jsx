"use client";

import Button from "@/components/Button";
import { MyCardView } from "@/components/CardView";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Sort from "@/components/Sort";
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MyApplied from "./_components/MyApplied";
import { useRouter } from "next/navigation";
import myChallengeService from "@/services/myChallengeService";
import { useInView } from "react-intersection-observer";
import translationService from "@/services/translationService";

const CHALLENGE_TYPES = [
  { label: "PARTICIPATING", value: "참여중인 챌린지" },
  { label: "COMPLETED", value: "완료한 챌린지" },
  { label: "APPLIED", value: "신청한 챌린지" },
];

const SORT_OPTION = [
  { value: "WAITING", label: "승인 대기" },
  { value: "APPROVED", label: "신청 승인" },
  { value: "REJECTED", label: "신청 거절" },
  { value: "createdAsc", label: "신청 시간 빠른순" },
  { value: "createdDesc", label: "신청 시간 느린순" },
  { value: "deadlineAsc", label: "마감 기한 빠른순" },
  { value: "deadlineDesc", label: "마감 기한 느린순" },
];

export default function MyPage() {
  const [activeType, setActive] = useState("PARTICIPATING");
  const [sortValue, setSortValue] = useState("WAITING");
  const [keyword, setKeyword] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [nextCursorId, setNextCursorId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const router = useRouter();
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (activeType !== "APPLIED") {
      async function getMyChallenges() {
        setIsLoading(true);
        const result = await myChallengeService.getMyChallenges({
          progress: activeType,
          keyword: keyword,
          pageSize: 5,
        });
        console.log(result);
        setChallenges(result.dataList);
        setNextCursorId(result.nextCursorId);
        setIsLoading(false);
      }
      getMyChallenges();
    } else {
      async function getMyAppliedChallenges() {
        setIsLoading(true);

        const result = await myChallengeService.getMyAppliedChallenges({
          keyword: keyword,
          page: page,
          pageSize: 5,
          sort: sortValue,
        });
        console.log(result);
        setChallenges(result.dataList);
        setTotalPage(result.totalPage);
        setIsLoading(false);
      }
      getMyAppliedChallenges();
    }
  }, [activeType, keyword, page, sortValue]);

  useEffect(() => {
    if (!inView || !nextCursorId || isLoading || activeType === "APPLIED") return;

    async function loadMore() {
      setIsLoading(true);
      const result = await myChallengeService.getMyChallenges({
        progress: activeType,
        keyword: keyword,
        pageSize: 5,
        cursorId: nextCursorId,
      });
      setChallenges((prev) => [...prev, ...result.dataList]);
      setNextCursorId(result.nextCursorId);
      setIsLoading(false);
    }
    loadMore();
  }, [inView]);

  const createTranslation = async (challengeId) => {
    const translation = await translationService.createTranslation(challengeId);
    router.push(`/challenges/${challengeId}/translations/${translation.id}/editor`);
  };

  const handleSubmit = (value) => {
    setKeyword(value);
  };

  return (
    <div className="bg-gray-50 flex-1 pb-[24px]">
      <div className="w-full max-w-[996px] mx-auto px-[24px]">
        <div className="flex justify-between mt-[24px]">
          <h2 className="text-gray-800 text-[20px] font-[600]">나의 챌린지</h2>
          <Link href={"challenges/create"}>
            <Button variant="solid" pill>
              신규 챌린지 신청
              <Image src="/icons/ic_plus_m.svg" alt="신규 챌린지 신청" width={16} height={16} />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-[24px] w-full h-full">
          <div className="w-full border-b-[1px] border-gray-300">
            {CHALLENGE_TYPES.map((button) => (
              <button
                key={button.label}
                onClick={() => setActive(button.label)}
                className={cn(
                  "cursor-pointer pt-[16px] md:px-[24px] px-[10px] text-nowrap md:text-[18px] text-[16px] font-[600]",
                  {
                    "pb-[13px] text-gray-800 border-b-[3px] border-brand-dark": activeType === button.label,
                    "pb-[16px] text-gray-500": activeType !== button.label,
                  },
                )}
              >
                {button.value}
              </button>
            ))}
          </div>
          <div className="flex justify-between gap-[12px]">
            <SearchBar className="max-w-full h-[40px]" onSubmit={handleSubmit} />
            {activeType === "APPLIED" && (
              <Sort
                value={sortValue}
                onChange={(value) => setSortValue(value)}
                options={SORT_OPTION}
                className="w-[180px]"
              />
            )}
          </div>

          {challenges.length === 0 ? (
            <p className="text-gray-500 text-[16px] font-[400] text-center lg:mt-[288px] md:mt-[327px] mt-[276px]">
              아직 챌린지가 없어요.
            </p>
          ) : activeType !== "APPLIED" ? (
            <div className="flex flex-col gap-[24px] mb-[14px]">
              {challenges.map((challenge) => (
                <MyCardView
                  className="bg-white"
                  key={challenge.id}
                  challenge={challenge}
                  onChallenge={(challengeId) => {
                    if (activeType === "PARTICIPATING") {
                      if (challenge.translationId)
                        router.push(`/challenges/${challengeId}/translations/${challenge.translationId}/editor`);
                      else createTranslation(challengeId);
                    } else {
                      router.push(`/challenges/${challengeId}/translations/${challenge.translationId}`);
                    }
                  }}
                />
              ))}
              {nextCursorId && <div ref={ref} style={{ height: "1px" }} />}
              {isLoading && <p className="text-center text-gray-400 text-[14px]">불러오는 중...</p>}
            </div>
          ) : (
            <div>
              <MyApplied challenges={challenges} />
              <div className="flex justify-center mt-[40px]">
                <Pagination
                  current={page}
                  setCurrent={setPage}
                  visiblePageCount={totalPage}
                  totalPageCount={totalPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
