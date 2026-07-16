"use client";

import { useState } from "react";
import Chip from "@/components/Chip";
import SearchBar from "@/components/SearchBar";
import Container from "@/components/Container";
import { CardView, MyCardView } from "@/components/CardView";
import { Reply, CreateReply } from "@/components/Reply";
import dateUtils from "@/utils/date";

// 해당 페이지는 공통 컴포넌트를 테스하기 위해 임시로 만든 페이지 입니다. 개발 완료후 삭제 예정 입니다.
export default function Page() {
  const handleSubmit = (value) => {
    console.log("검색어:", value);
  };

  const currentUser = { id: 1 };

  const [replies, setReplies] = useState([
    {
      id: 101,
      userId: 1,
      createdBy: "김리뷰 (나)",
      createdAt: "2026-07-14",
      content: "본인이 작성한 댓글입니다. 케밥메뉴로 수정/삭제가 가능해야 합니다.",
    },
    {
      id: 102,
      userId: 2,
      createdBy: "박작성",
      createdAt: "2026-07-13",
      content: "다른 사용자가 작성한 댓글입니다. 케밥메뉴가 보이면 안 됩니다.",
    },
  ]);
  const [replyValue, setReplyValue] = useState("");

  const handleReplyEdit = async (id, content) => {
    console.log("댓글 수정:", id, content);
    setReplies((prev) => prev.map((reply) => (reply.id === id ? { ...reply, content } : reply)));
  };

  const handleReplyDelete = (id) => {
    console.log("댓글 삭제:", id);
    setReplies((prev) => prev.filter((reply) => reply.id !== id));
  };

  const handleReplyCreate = () => {
    if (!replyValue.trim()) return;
    console.log("댓글 등록:", replyValue);
    setReplies((prev) => [
      ...prev,
      { id: Date.now(), userId: currentUser.id, createdBy: "김리뷰 (나)", createdAt: "방금 전", content: replyValue },
    ]);
    setReplyValue("");
  };

  const adminUser = { role: "ADMIN" };
  const normalUser = { role: "USER" };

  const activeChallenge = {
    id: 1,
    title: "진행중인 챌린지 (마감 전 · 정원 여유)",
    field: "Next.js",
    doctype: "공식문서",
    deadline: new Date(2027, 11, 13),
    count: 3,
    headcount: 10,
  };

  const fullChallenge = {
    id: 2,
    title: "모집이 완료된 챌린지",
    field: "API",
    doctype: "블로그",
    deadline: new Date(2027, 11, 13),
    count: 10,
    headcount: 10,
  };

  const closedChallenge = {
    id: 3,
    title: "마감된 챌린지",
    field: "Career",
    doctype: "공식문서",
    deadline: new Date(2020, 0, 1),
    count: 4,
    headcount: 10,
  };

  const handleEdit = (id) => console.log("수정 클릭:", id);
  const handleDelete = (id) => console.log("삭제 클릭:", id);
  const handleChallenge = (id) => console.log("도전 계속하기 클릭:", id);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-4">
      <SearchBar onSubmit={handleSubmit} />
      <Container date={new Date(2027, 2, 3)} maxMember={15} member={15} />

      <div className="flex w-full max-w-249 flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-700">CardView - 관리자(ADMIN)</h2>
        <CardView challenge={activeChallenge} user={adminUser} onEdit={handleEdit} onDelete={handleDelete} />
        <CardView challenge={fullChallenge} user={adminUser} onEdit={handleEdit} onDelete={handleDelete} />
        <CardView challenge={closedChallenge} user={adminUser} onEdit={handleEdit} onDelete={handleDelete} />

        <h2 className="mt-4 text-lg font-bold text-gray-700">CardView - 일반 사용자</h2>
        <CardView challenge={activeChallenge} user={normalUser} onEdit={handleEdit} onDelete={handleDelete} />
        <CardView challenge={fullChallenge} user={normalUser} onEdit={handleEdit} onDelete={handleDelete} />
        <CardView challenge={closedChallenge} user={normalUser} onEdit={handleEdit} onDelete={handleDelete} />

        <h2 className="mt-4 text-lg font-bold text-gray-700">MyCardView - 관리자(ADMIN)</h2>
        <MyCardView
          challenge={activeChallenge}
          user={adminUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
        <MyCardView
          challenge={fullChallenge}
          user={adminUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
        <MyCardView
          challenge={closedChallenge}
          user={adminUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />

        <h2 className="mt-4 text-lg font-bold text-gray-700">MyCardView - 일반 사용자</h2>
        <MyCardView
          challenge={activeChallenge}
          user={normalUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
        <MyCardView
          challenge={fullChallenge}
          user={normalUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
        <MyCardView
          challenge={closedChallenge}
          user={normalUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
      </div>

      <div className="flex w-full max-w-249 flex-col gap-4 rounded-2xl border-2 border-gray-100 bg-white p-5">
        <h2 className="text-lg font-bold text-gray-700">댓글 기능 (Reply / CreateReply)</h2>
        {replies.map((reply) => (
          <Reply
            key={reply.id}
            user={currentUser}
            reply={reply}
            onEdit={handleReplyEdit}
            onDelete={handleReplyDelete}
          />
        ))}
        <CreateReply
          value={replyValue}
          onChange={(e) => setReplyValue(e.target.value)}
          isActive={replyValue.trim().length > 0}
          onClick={handleReplyCreate}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Chip variant="field" value="Next.js" />
        <Chip variant="field" value="API" />
        <Chip variant="field" value="Career" />
        <Chip variant="field" value="Modern JS" />
        <Chip variant="field" value="Web" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Chip variant="docType" value="공식문서" />
        <Chip variant="docType" value="블로그" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Chip variant="status" value="PENDING" />
        <Chip variant="status" value="APPROVED" />
        <Chip variant="status" value="REJECTED" />
        <Chip variant="status" value="DELETED" />
      </div>
    </div>
  );
}
