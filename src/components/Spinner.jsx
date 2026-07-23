import Image from "next/image";

export default function Spinner() {
  return (
    <Image width={30} height={30} alt="로딩 스피너 아이콘" src="/icons/ic_refresh.svg" className="animate-spinner" />
  );
}
