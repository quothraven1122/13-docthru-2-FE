"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Chip from "@/components/Chip";
import Container from "@/components/Container";
import List from "@/components/List";
import KebabMenu from "@/components/KebabMenu";
import Modal from "@/components/Modal";
import ParticipantPagination from "./_components/ParticipantPagination";
import { useAuth } from "@/providers/AuthProvider";
import challengeService from "@/services/challengeService";
import translationService from "@/services/translationService";

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
  const [prevChallengeId, setPrevChallengeId] = useState(challengeId);
  const [isParticipantsLoading, setIsParticipantsLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (challengeId !== prevChallengeId) {
    setPrevChallengeId(challengeId);
    setParticipantsPage(1);
  }
  // 챌린지 상세 조회
  useEffect(() => {
    if (!challengeId) return;

    let ignore = false;

    const fetchChallenge = async () => {
      setIsChallengeLoading(true);
      setChallengeError(null);
      try {
        const data = await challengeService.getChallengeDetail(challengeId);
        if (!ignore) setChallenge(data);
      } catch (err) {
        if (!ignore) setChallengeError(err.message);
      } finally {
        if (!ignore) setIsChallengeLoading(false);
      }
    };

    fetchChallenge();

    return () => {
      ignore = true;
    };
  }, [challengeId]);

  // 참여자 목록 조회
  useEffect(() => {
    if (!challengeId) return;

    let ignore = false;

    const fetchParticipants = async () => {
      setIsParticipantsLoading(true);
      try {
        const data = await challengeService.getParticipants(challengeId, {
          page: participantsPage,
          pageSize: PARTICIPANTS_PAGE_SIZE,
        });
        if (!ignore) {
          setParticipants(data.list);
          setTotalPageCount(data.totalPageCount);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setIsParticipantsLoading(false);
      }
    };

    fetchParticipants();

    return () => {
      ignore = true;
    };
  }, [challengeId, participantsPage]);

  if (isChallengeLoading) {
    return <div className="mx-auto max-w-3xl px-6 py-10">불러오는 중...</div>;
  }

  if (challengeError || !challenge) {
    return <div className="mx-auto max-w-3xl px-6 py-10">챌린지를 불러오지 못했어요.</div>;
  }

  // 관리자만 수정/삭제 가능
  const isAdmin = user?.role === "ADMIN";

  const handleViewOriginal = () => {
    window.open("https://www.wikipedia.org/", "_blank", "noopener,noreferrer");
  };
  const handleChallenge = async () => {
    try {
      const translation = await translationService.createTranslation(challengeId);
      router.push(`/challenges/${challengeId}/translations/${translation.id}/editor`);
    } catch (err) {
      alert(err.message || "작업을 시작할 수 없습니다.");
    }
  };
  const handleViewWork = (item) => {
    if (!item.translationId) {
      alert("아직 제출된 작업물이 없습니다.");
      return;
    }
    router.push(`/challenges/${challengeId}/translations/${item.translationId}`);
  };

  const handleEdit = () => {
    if (!isAdmin) return;
    router.push(`/challenges/${challengeId}/edit`);
  };

  const handleDeleteConfirm = async () => {
    if (!isAdmin || isDeleting) return;

    try {
      setIsDeleting(true);
      await challengeService.deleteChallenge(challengeId);
      alert("챌린지가 삭제되었습니다.");
      router.push("/challenges");
    } catch (err) {
      alert(err.message || "삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <section className="border-b border-neutral-200 pb-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{challenge.title}</h1>
              {isAdmin && <KebabMenu onEdit={handleEdit} onDelete={() => setIsDeleteModalOpen(true)} />}
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
            <List items={participants} onItemClick={handleViewWork} />
          )}
        </div>
      </section>

      {/* 삭제 모달 (Portal 적용) - 관리자만 열 수 있음 */}
      {isDeleteModalOpen &&
        isAdmin &&
        typeof window !== "undefined" &&
        createPortal(
          <Modal
            handleClose={handleDeleteCancel}
            cancelText="아니오"
            confirmText={isDeleting ? "삭제 중..." : "네"}
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          >
            정말 삭제하시겠어요?
          </Modal>,
          document.body,
        )}
    </div>
  );
}
