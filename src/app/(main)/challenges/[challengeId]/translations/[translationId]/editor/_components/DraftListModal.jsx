import Image from "next/image";

import ModalContainer from "@/components/ModalContainer";
import dateUtils from "@/utils/date";
import textUtils from "@/utils/text";

export default function DraftListModal({ draftList, onConfirm = () => {}, onDelete = () => {}, onClose = () => {} }) {
  return (
    <ModalContainer handleClose={onClose} className="w-[450px] gap-0">
      <header className="w-full flex justify-between">
        <h1 className="text-[16px] font-semibold">임시저장 글</h1>

        <Image
          width={24}
          height={24}
          alt="취소 버튼 아이콘"
          src="/icons/ic_out_circle_m.svg"
          onClick={onClose}
          className="cursor-pointer"
        />
      </header>

      <p className="w-full text-[12px] font-normal mt-[28px] mb-[16px]">총 {draftList.length}개</p>

      <div className="w-full h-[280px] overflow-auto divide-y divide-gray-200">
        {draftList.map((draft) => {
          return (
            <div
              key={draft.id}
              onClick={() => {
                onConfirm(draft.content);
              }}
              className="h-fit flex items-start px-[10px] py-[12px] cursor-pointer"
            >
              <Image
                width={20}
                height={20}
                alt="임시저장 글 지우기 아이콘"
                src="/icons/ic_out_circle_m.svg"
                onClick={(e) => {
                  e.stopPropagation();

                  onDelete(draft.id);
                  onClose();
                }}
                className="mr-[10px]"
              />

              <div>
                <h2 className="text-[14px] text-gray-800 font-medium">{textUtils.truncateText(draft.title, 35)}</h2>

                <p className="text-[12px] text-gray-400 font-normal">
                  {textUtils.truncateText(draft.content.text, 30)}
                </p>

                <p className="text-[12px] text-gray-400 font-normal">{dateUtils.format(draft.createdAt, "dot")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}
