"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import Image from "next/image";

export default function DateInput({ selectedDate, setSelectedDate, ...inputProps }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => {
          if (!selectedDate) setSelectedDate(new Date());
          setIsOpen((prev) => !prev);
        }}
        className="cursor-pointer px-[20px] py-[15px] rounded-[12px] flex border-1 border-gray-200"
      >
        <p className="flex-1 outline-none text-[#a1a1a1] text-[16px]">
          {selectedDate
            ? `${selectedDate.getFullYear()} / ${String(selectedDate.getMonth() + 1).padStart(2, "0")} / ${String(selectedDate.getDate()).padStart(2, "0")}`
            : "YY / MM / DD"}
        </p>
        <Image width={24} height={24} src="/icons/ic_calendar.svg" alt="날짜 입력란 아이콘" />
      </div>
      {isOpen && (
        <Calendar
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setIsOpen(false);
          }}
          formatDay={(_, day) => day.getDate().toString()}
          prev2Label={null} //100년 단위 이동 막기
          next2Label={null}
          minDate={new Date(new Date().setHours(0, 0, 0, 0))}
          className="absolute right-0 mt-[10px]"
          {...inputProps}
        />
      )}
    </div>
  );
}
