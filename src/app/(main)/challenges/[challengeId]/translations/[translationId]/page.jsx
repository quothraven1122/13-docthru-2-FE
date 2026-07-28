"use client";
import Button from "@/components/Button";
import Chip from "@/components/Chip";
import KebabMenu from "@/components/KebabMenu";
import { CreateReply, Reply } from "@/components/Reply";
import TranslationViewer from "@/components/TranslaionViewer";
import { useLikeCount, useLikeStatus, useToggleLike } from "@/hooks/useLike";
import { useCreateReview, useDeleteReview, useReviews, useUpdateReview } from "@/hooks/useReview";
import { useDeleteTranslation, useTranslationDetail } from "@/hooks/useTranslationDetail";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TranslationDetailPage() {
  const { challengeId, translationId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { data: translation, isPending, isError } = useTranslationDetail(translationId);

  const { mutate: deleteTranslation } = useDeleteTranslation(translationId, challengeId);

  const handleEditTranslation = () => {
    router.push(`/challenges/${challengeId}/translations/${translationId}/editor`);
  };

  const handleDeleteTranslation = () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    deleteTranslation();
  };
  const { data: likeCountData } = useLikeCount(translationId);
  const { data: likeStatusData } = useLikeStatus(translationId, !!user);
  const { mutate: toggleLike } = useToggleLike(translationId);

  const isLiked = likeStatusData?.isLiked ?? false;
  const likeCount = likeCountData?.count ?? 0;

  const handleToggleLike = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    toggleLike();
  };

  const { data: reviewPages, fetchNextPage, hasNextPage, isFetchingNextPage } = useReviews(translationId);
  const { mutateAsync: createReview } = useCreateReview(translationId);
  const { mutateAsync: updateReview } = useUpdateReview(translationId);
  const { mutate: deleteReview } = useDeleteReview(translationId);

  const [newReply, setNewReply] = useState("");

  const handleCreateReply = async () => {
    if (!newReply.trim()) return;
    if (!user) {
      router.push("/login");
      return;
    }
    await createReview(newReply);
    setNewReply("");
  };

  const handleEditReply = async (id, content) => {
    await updateReview({ reviewId: id, content });
  };

  const handleDeleteReply = (id) => {
    deleteReview(id);
  };

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>번역물을 불러오지 못했어요.</div>;

  const createdAt = translation?.createdAt ? new Date(translation.createdAt).toISOString().slice(0, 10) : "";

  const replies = (reviewPages?.pages.flat() ?? []).map((review) => ({
    id: review.id,
    userId: review.reviewerId,
    createdBy: review.reviewer?.nickname ?? "사용자",
    createdAt: new Date(review.createdAt).toISOString().slice(0, 10),
    content: review.content,
  }));

  return (
    // 레이앙수 편입시 여기 클래스 긁어서 쓰기
    <div className="mx-auto w-full max-w-222.5">
      <div className="px-4 py-6">
        <div>
          <div className="flex justify-between">
            <div className="text-gray-800 text-xl/normal font-semibold">{translation.title}</div>
            {translation.participation?.participatorId === user?.id && user ? (
              <KebabMenu onEdit={handleEditTranslation} onDelete={handleDeleteTranslation} />
            ) : null}
          </div>
          <div className="flex gap-2 my-4">
            <Chip variant="field" value={translation.field} />
            <Chip variant="docType" value={translation.docType} />
          </div>
        </div>
        <div className="flex justify-between py-4 border-y border-gray-200">
          <div className="flex items-center">
            <Image src={"/icons/ic_profile_member.svg"} width={24} height={24} alt="" />
            <span className="ml-2 text-gray-800 text-xs/normal font-medium">{translation.nickname}</span>
            <div className="flex ml-3 gap-1 cursor-pointer" onClick={handleToggleLike}>
              <Image
                src={isLiked ? "/icons/ic_heart_s_active.svg" : "/icons/ic_heart_s_inactive.svg"}
                width={16}
                height={16}
                alt=""
                className="w-3.5 h-auto"
              />
              <span>{likeCount}</span>
            </div>
          </div>
          <div className="text-gray-500 text-sm/normal font-medium">{createdAt}</div>
        </div>

        <div className="pt-4 pb-10 border-b border-gray-200">
          {!translation?.content ? (
            <div className="flex flex-col justify-center items-center min-h-100">
              <Image src={"/images/img_empty.png"} width={320} height={168} alt="" priority />
              <div>아직 아무런 번역을 진행하지 않았어요!</div>
            </div>
          ) : (
            <TranslationViewer content={translation.content} />
          )}
        </div>

        <div className="pt-6 flex flex-col gap-6">
          <CreateReply
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            onClick={handleCreateReply}
            isActive={newReply.trim().length > 0}
          />
          {replies.map((reply) => (
            <Reply key={reply.id} user={user} reply={reply} onEdit={handleEditReply} onDelete={handleDeleteReply} />
          ))}
          {hasNextPage && (
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-45 h-12 m-auto text-center text-gray-500 bg-gray-100 rounded-xl"
            >
              {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
