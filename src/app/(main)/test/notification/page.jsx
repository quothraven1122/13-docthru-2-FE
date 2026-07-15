"use client";
import Notification from "@/components/Notification";
import { useClickOutside } from "@/hooks/useClickOutside";
import React, { useRef, useState } from "react";

export default function page() {
  const [isOpen, setIsOpen] = useState(false);
  const notiRef = useRef(null);
  useClickOutside(notiRef, () => {
    setIsOpen(false);
  });

  const testData = [
    {
      message: "‘신청한 챌린지 이름'이 승인/거절되었어요",
      date: "2024.04.01",
    },
    {
      message: "‘신청한 챌린지 이름'이 승인/거절되었어요",
      date: "2024.04.01",
    },
    {
      message: "‘신청한 챌린지 이름'이 승인/거절되었어요",
      date: "2024.04.01",
    },
    {
      message: "‘신청한 챌린지 이름'이 승인/거절되었어요",
      date: "2024.04.01",
    },
    {
      message: "‘신청한 챌린지 이름'이 승인/거절되었어요",
      date: "2024.04.01",
    },
    {
      message: "‘신청한 챌린지 이름'이 승인/거절되었어요",
      date: "2024.04.01",
    },
  ];

  return (
    <div ref={notiRef}>
      <div className="relative flex justify-center">
        <button
          className="w-[120px] border-[1px]"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          알림 버튼
        </button>
        {isOpen && <Notification contents={testData}></Notification>}
      </div>
    </div>
  );
}
