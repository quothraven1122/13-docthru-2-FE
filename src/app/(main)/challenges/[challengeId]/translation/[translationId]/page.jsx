"use client";
import Chip from "@/components/Chip";
import { CreateReply, Reply } from "@/components/Reply";
import Image from "next/image";
import React, { useState } from "react";
const TestData = {
  title: "테스트 챌린지 데이터 입니다.",
  createdBy: "사용자",
  createdAt: "2026-01-02",
  content: "",
  field: "API",
  doctype: "공식문서",
  like: "222",
};

const TestUser = { id: 1 };

const TestReplyData = [
  {
    id: 1,
    userId: 1,
    createdBy: "사용자",
    createdAt: "2026-01-03",
    content: "좋은 번역이네요!",
  },
  {
    id: 2,
    userId: 2,
    createdBy: "다른사용자",
    createdAt: "2026-01-04",
    content: "이 부분은 조금 다르게 번역하면 어떨까요?",
  },
];

export default function Page() {
  const [replies, setReplies] = useState(TestReplyData);
  const [newReply, setNewReply] = useState("");

  const handleCreateReply = () => {
    if (!newReply.trim()) return;
    setReplies((prev) => [
      ...prev,
      {
        id: Date.now(),
        userId: TestUser.id,
        createdBy: TestData.createdBy,
        createdAt: new Date().toISOString().slice(0, 10),
        content: newReply,
      },
    ]);
    setNewReply("");
  };

  const handleEditReply = async (id, content) => {
    setReplies((prev) => prev.map((reply) => (reply.id === id ? { ...reply, content } : reply)));
  };

  const handleDeleteReply = (id) => {
    setReplies((prev) => prev.filter((reply) => reply.id !== id));
  };

  return (
    // 레이앙수 편입시 여기 클래스 긁어서 쓰기
    <div className="mx-auto w-full max-w-222.5">
      <div className="px-4 py-6">
        <div>
          <div className="text-gray-800 text-xl/normal font-semibold">{TestData.title}</div>
          <div className="flex gap-2 my-4">
            <Chip variant="field" value={TestData.field} />
            <Chip variant="docType" value={TestData.doctype} />
          </div>
        </div>
        <div className="flex justify-between py-4 border-y border-gray-200">
          <div className="flex items-center">
            <Image src={"/icons/ic_profile_member.svg"} width={24} height={24} alt="" />
            <span className="ml-2 text-gray-800 text-xs/normal font-medium">{TestData.createdBy}</span>
            {/* TODO: 좋아요 로직 추가 */}
            <div className="flex ml-3 gap-1">
              <Image src={"/icons/ic_heart_s_inactive.svg"} width={14} height={14} alt="" />
              <span>{TestData.like}</span>
            </div>
          </div>
          <div className="text-gray-500 text-sm/normal font-medium">{TestData.createdAt}</div>
        </div>

        <div className="pt-4 pb-10 border-b border-gray-200">
          {!TestData.content ? (
            <div className="flex flex-col justify-center items-center min-h-100">
              <Image src={"/images/img_empty.png"} width={320} height={168} alt="" />
              <div>아직 아무런 번역을 진행하지 않았어요!</div>
            </div>
          ) : (
            // TODO: tiptap 뷰어가 따로 있을텐데 ---> 그걸로 수정
            <div>{TestData.content}</div>
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
            <Reply key={reply.id} user={TestUser} reply={reply} onEdit={handleEditReply} onDelete={handleDeleteReply} />
          ))}
        </div>
      </div>
    </div>
  );
}
