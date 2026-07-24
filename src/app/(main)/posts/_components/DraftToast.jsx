import Image from "next/image";
import Button from "@/components/Button";

export default function DraftToast({ content, closeToast = () => {}, onConfirm = () => {} }) {
  return (
    <div className="max-w-[890px] fixed left-[15px] right-[15px] bottom-[15px] m-auto h-fit flex justify-between gap-[14px] p-[8px] border border-gray-800 rounded-[8px] bg-gray-50 z-sticky">
      <div className="flex items-center">
        <Image
          width={24}
          height={24}
          alt="취소 버튼 아이콘"
          src="/icons/ic_out_circle_m.svg"
          onClick={closeToast}
          className="cursor-pointer"
        />
        <p>{content}</p>
      </div>
      <Button type="button" onClick={onConfirm} className="px-[20px] rounded-[10px] bg-brand-dark whitespace-nowrap">
        불러오기
      </Button>
    </div>
  );
}
