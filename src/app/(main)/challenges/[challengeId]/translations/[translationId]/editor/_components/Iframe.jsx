import Link from "next/link";
import Image from "next/image";

import Spinner from "@/components/Spinner";

export default function Iframe({ src, isIframeOpen, isIframeLoading, setIsIframeOpen, setIsIframeLoading }) {
  return (
    <>
      {isIframeOpen && (
        <div className="flex flex-1 min-w-0 min-h-0 flex-col">
          <header className="w-full h-[48px] bg-gray-400 flex justify-between items-center px-[16px] py-[8px]">
            <button onClick={() => setIsIframeOpen(false)} className="cursor-pointer">
              <Image width={32} height={32} alt="iframe 나가기 버튼 아이콘" src="/icons/ic_out_circle_m.svg" />
            </button>

            <Link
              href={src}
              target="_blank"
              className="flex gap-[2px] bg-[#dcdcdc] px-[12px] py-[4px] rounded-[12px] text-[16px] text-gray-700 font-bold cursor-pointer"
            >
              <p>링크 열기</p>
              <Image width={24} height={24} alt="링크 열기 아이콘" src="/icons/ic_click.svg" />
            </Link>
          </header>

          <div className="relative w-full h-full flex justify-center items-center">
            {isIframeLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                <Spinner />
              </div>
            )}

            <iframe src={src} onLoad={() => setIsIframeLoading(false)} className="w-full h-full flex-1" />
          </div>
        </div>
      )}
    </>
  );
}
