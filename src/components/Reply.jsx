"use client";
import Image from "next/image";
import React, { useState } from "react";
import KebabMenu from "./KebabMenu";

//인라인 업데이트 기능을 위한 user와 댓글
export function Reply({ user, reply, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(reply.content);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const isAuthor = !!user && String(reply.userId) === String(user.id);

  const handleSave = async () => {
    if (!content.trim() || content === reply.content) {
      setIsEditing(false);
      setContent(reply.content);
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      await onEdit(reply.id, content); // 부모에서 mutation 실행
      setIsEditing(false);
    } catch {
      setError("댓글 수정에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setContent(reply.content); // 원본으로 롤백
    setError(null);
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-gray-50 p-4 rounded-xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/img_profile_member.svg" width={32} height={32} alt="" />
          <div>
            <div className="text-sm/normal font-medium text-gray-800">{reply.createdBy}</div>
            <div className="text-xs/normal font-medium text-gray-400">{reply.createdAt}</div>
          </div>
        </div>
        {isAuthor && !isEditing && <KebabMenu onEdit={() => setIsEditing(true)} onDelete={() => onDelete(reply.id)} />}
        {isAuthor && isEditing && (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="font-semibold text-sm/normal text-gray-500 py-0.5 "
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="text-white font-semibold text-sm/normal bg-[#262626] rounded-[10px] px-4 py-0.5"
            >
              {isSaving ? "수정 중..." : "수정완료"}
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSaving}
            className="w-full p-4 mt-3 border border-gray-200 rounded-xl bg-white resize-none overflow-y-auto"
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          {/* <div className="flex justify-end gap-2">
            <button type="button" onClick={handleCancel} disabled={isSaving}>
              취소
            </button>
            <button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "저장 중..." : "저장"}
            </button>
          </div> */}
        </div>
      ) : (
        <p className="mt-3 text-gray-700 text-sm/normal font-normal">{reply.content}</p>
      )}
    </div>
  );
}

// isActive는 value값에따라 제어 가능하게
export function CreateReply({ value, onChange, onClick, isActive }) {
  return (
    <div className="flex justify-between items-start gap-4 md:gap-6">
      <textarea
        value={value}
        onChange={onChange}
        placeholder="피드백을 남겨주세요"
        className="w-full p-4 border border-gray-200 rounded-xl bg-white resize-none overflow-y-auto"
      />
      <button
        type="button"
        disabled={!isActive}
        aria-label="피드백 등록"
        className="cursor-pointer disabled:cursor-not-allowed"
        onClick={onClick}
      >
        <Image
          src={isActive ? "/icons/ic_feedback_active.svg" : "/icons/ic_feedback_inactive.svg"}
          width={40}
          height={40}
          alt=""
          className="w-8 h-auto md:w-10 md:h-auto"
        />
      </button>
    </div>
  );
}
