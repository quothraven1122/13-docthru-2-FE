import Chip from "@/components/Chip";

import cn from "@/utils/cn";

const headerCellClassName = "bg-gray-800 px-[8px] py-[10px] font-medium lg:px-[16px]";
const cellClassName = "border-b border-gray-300 px-[8px] py-[15px] text-gray-500 lg:px-[16px]";

export default function ApplicationTable({ applications = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] table-fixed border-separate border-spacing-0 text-left text-[13px]">
        <colgroup>
          <col className="w-[48px] lg:w-[68px]" />
          <col className="w-[72px] lg:w-[84px]" />
          <col className="w-[72px] lg:w-[84px]" />
          <col />
          <col className="w-[48px] lg:w-[94px]" />
          <col className="w-[68px] lg:w-[94px]" />
          <col className="w-[76px] lg:w-[94px]" />
          <col className="w-[104px] lg:w-[120px]" />
        </colgroup>
        <thead>
          <tr className="text-white">
            <th className={cn(headerCellClassName, "rounded-l-[8px]")}>No.</th>
            <th className={headerCellClassName}>분야</th>
            <th className={headerCellClassName}>카테고리</th>
            <th className={headerCellClassName}>챌린지 제목</th>
            <th className={headerCellClassName}>
              <span className="lg:hidden">인원</span>
              <span className="hidden lg:inline">모집 인원</span>
            </th>
            <th className={headerCellClassName}>신청일</th>
            <th className={headerCellClassName}>마감 기한</th>
            <th className={cn(headerCellClassName, "rounded-r-[8px]")}>상태</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id} className={cn(application.status === "DELETED" && "bg-gray-50")}>
              <td className={cellClassName}>{application.no}</td>
              <td className={cellClassName}>{application.field}</td>
              <td className={cellClassName}>{application.docType}</td>
              <td className={cn(cellClassName, "font-medium text-gray-700")}>
                <p className="line-clamp-2 lg:line-clamp-1">{application.title}</p>
              </td>
              <td className={cellClassName}>{application.maxMember}</td>
              <td className={cellClassName}>{application.appliedAt}</td>
              <td className={cellClassName}>{application.deadline}</td>
              <td className={cellClassName}>
                <Chip variant="status" value={application.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
