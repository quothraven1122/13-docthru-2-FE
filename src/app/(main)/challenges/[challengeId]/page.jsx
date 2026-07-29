"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Chip from "@/components/Chip";
import Container from "@/components/Container";
import List from "@/components/List";
import KebabMenu from "@/components/KebabMenu";
import ParticipantPagination from "./_components/ParticipantPagination";
import { useAuth } from "@/providers/AuthProvider";
import challengeService from "@/services/challengeService";

const PARTICIPANTS_PAGE_SIZE = 5;

export default function ChallengeDetailPage() {
  const { challengeId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [challenge, setChallenge] = useState(null);
  const [isChallengeLoading, setIsChallengeLoading] = useState(true);
  const [challengeError, setChallengeError] = useState(null);

  const [participants, setParticipants] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [participantsPage, setParticipantsPage] = useState(1);
  const [isParticipantsLoading, setIsParticipantsLoading] = useState(true);

  // 챌린지 상세 조회
  useEffect(() => {
    if (!challengeId) return;

    const fetchChallenge = async () => {
      setIsChallengeLoading(true);
      setChallengeError(null);
      try {
        const data = await challengeService.getChallengeDetail(challengeId);
        setChallenge(data);
      } catch (err) {
        setChallengeError(err.message);
      } finally {
        setIsChallengeLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  // 참여자 목록 조회
  useEffect(() => {
    if (!challengeId) return;

    const fetchParticipants = async () => {
      setIsParticipantsLoading(true);
      try {
        const data = await challengeService.getParticipants(challengeId, {
          page: participantsPage,
          pageSize: PARTICIPANTS_PAGE_SIZE,
        });
        setParticipants(data.list);
        setTotalPageCount(data.totalPageCount);
      } catch (err) {
        console.error(err);
      } finally {
        setIsParticipantsLoading(false);
      }
    };

    fetchParticipants();
  }, [challengeId, participantsPage]);

  if (isChallengeLoading) {
    return <div className="mx-auto max-w-3xl px-6 py-10">불러오는 중...</div>;
  }

  if (challengeError || !challenge) {
    return <div className="mx-auto max-w-3xl px-6 py-10">챌린지를 불러오지 못했어요.</div>;
  }

  const isAdmin = user?.role === "ADMIN";

  const handleViewOriginal = () => {
    window.open(challenge.link, "_blank", "noopener,noreferrer");
  };

  const handleChallenge = () => {
    router.push(`/challenges/${challengeId}/translations/create`);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <section className="border-b border-neutral-200 pb-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{challenge.title}</h1>
              {/* 어드민일 때만 노출 */}
              {isAdmin && (
                <KebabMenu
                  onEdit={() => {
                    // 수정 페이지 이동 로직 연결 예정
                  }}
                  onDelete={() => {
                    // 삭제 확인 모달/API 연결 예정
                  }}
                />
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Chip variant="field" value={challenge.category} />
              <Chip variant="docType" value={challenge.docType} />
            </div>

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{challenge.description}</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
              <Image
                src="/icons/ic_profile_member.svg"
                alt={`${challenge.authorName} 프로필`}
                width={20}
                height={20}
                className="h-5 w-5 rounded-full"
              />
              <span>{challenge.authorName}</span>
            </div>
          </div>

          <Container
            date={challenge.deadlineDate}
            member={challenge.member}
            maxMember={challenge.headcount}
            onViewOriginal={handleViewOriginal}
            onChallenge={handleChallenge}
          />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-neutral-200 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">참여 현황</h2>
          <ParticipantPagination
            currentPage={participantsPage}
            totalPageCount={totalPageCount}
            onPageChange={setParticipantsPage}
          />
        </div>

        <div className="mt-4">
          {isParticipantsLoading ? (
            <p className="text-sm text-neutral-400">불러오는 중...</p>
          ) : (
            <List items={participants} />
          )}
        </div>
      </section>
    </div>
  );
}
