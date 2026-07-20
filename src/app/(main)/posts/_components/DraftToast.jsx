import Image from "next/image";

export default function DraftToast({ content, closeToast = () => {}, onConfirm = () => {} }) {
  return (
    <div className="absolute left-[5px] right-[5px] bottom-[15px] h-fit flex justify-between p-[8px] border border-gray-800 rounded-[8px] bg-gray-50">
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
      <button
        type="button"
        onClick={onConfirm}
        className="px-[20px] py-[8px] rounded-[10px] whitespace-nowrap text-white bg-brand-dark cursor-pointer"
      >
        불러오기
      </button>
    </div>
  );
}
