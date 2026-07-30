import Image from "next/image";

export default function ParticipantPagination({ currentPage, totalPageCount, onPageChange }) {
  const handlePrev = () => {
    if (currentPage <= 1) return;
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage >= totalPageCount) return;
    onPageChange(currentPage + 1);
  };

  if (totalPageCount <= 1) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-[62px] items-center justify-center rounded-full border border-neutral-200 text-xs font-medium text-neutral-700">
        <span className="text-neutral-900">{currentPage}</span>
        <span className="mx-0.5 text-neutral-400">/</span>
        <span>{totalPageCount}</span>
      </div>

      <button type="button" onClick={handlePrev} disabled={currentPage === 1}>
        <Image
          src={
            currentPage === 1 ? "/icons/ic_pagination_left_inactive_s.svg" : "/icons/ic_pagination_left_active_s.svg"
          }
          width={16}
          height={16}
          alt=""
        />
      </button>

      <button type="button" onClick={handleNext} disabled={currentPage === totalPageCount}>
        <Image
          src={
            currentPage === totalPageCount
              ? "/icons/ic_pagination_right_inactive_s.svg"
              : "/icons/ic_pagination_right_active_s.svg"
          }
          width={16}
          height={16}
          alt=""
        />
      </button>
    </div>
  );
}
