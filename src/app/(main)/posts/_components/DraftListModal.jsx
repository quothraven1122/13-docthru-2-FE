import Image from "next/image";

import ModalContainer from "@/components/ModalContainer";
import dateUtils from "@/utils/date";

export default function DraftListModal({ draftList, onConfirm = () => {}, handleClose = () => {} }) {
  return (
    <ModalContainer handleClose={handleClose} className="w-[450px] gap-0">
      <header className="w-full flex justify-between">
        <h1 className="text-[16px] font-semibold">임시저장 글</h1>
        <Image width={24} height={24} alt="취소 버튼 아이콘" src="/icons/ic_out_circle_m.svg" onClick={handleClose} />
      </header>
      <p className="w-full text-[12px] font-normal mt-[28px] mb-[16px]">총 {Object.keys(draftList).length}개</p>
      <div className="w-full h-[280px] overflow-auto divide-y divide-gray-200">
        {Object.entries(draftList).map(([key, value]) => {
          return (
            <div
              key={key}
              onClick={() => {
                onConfirm(value.content);
              }}
              className="h-[80px] flex items-start px-[10px] py-[12px] cursor-pointer"
            >
              <Image
                width={20}
                height={20}
                alt="임시저장 글 지우기 아이콘"
                src="/icons/ic_out_circle_m.svg"
                onClick={(e) => {
                  e.stopPropagation();
                  localStorage.removeItem(key);
                }}
                className="mr-[10px]"
              />
              <div>
                <h2 className="text-[14px] text-gray-800 font-medium">{value.title}</h2>
                <p className="text-[12px] text-gray-400 font-normal">{value.content.text}</p>
                <p className="text-[12px] text-gray-400 font-normal">{dateUtils.format(value.createdAt, "dot")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}
