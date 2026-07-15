import React from "react";
import Image from "next/image";

const ICONS = {
  crown: "/icons/ic_crown.svg",
  heartActive: "/icons/ic_heart_s_active.svg",
  heartInactive: "/icons/ic_heart_s_inactive.svg",
  profileMember: "/icons/ic_profile_member.svg",
  out: "/icons/ic_pagination_right_active_s.svg",
};

function ListItem({ rank, name, role, likeCount, liked = true, onViewWork }) {
  const isTop = rank === 1;

  return (
    <div className="flex h-[35px] w-full items-center justify-between self-stretch">
      <div className="flex items-center gap-3">
        <span className="flex h-6 min-w-[28px] items-center justify-center gap-0.5 rounded-full bg-black px-1.5 text-xs font-semibold text-white">
          {isTop && <Image src={ICONS.crown} alt="" width={12} height={12} className="h-3 w-3" aria-hidden="true" />}
          {String(rank).padStart(2, "0")}
        </span>

        <Image
          src={ICONS.profileMember}
          alt={`${name} 프로필`}
          width={24}
          height={24}
          className="h-6 w-6 rounded-full"
        />

        <div className="leading-tight">
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-sm text-gray-700">
          <Image
            src={liked ? ICONS.heartActive : ICONS.heartInactive}
            alt=""
            width={16}
            height={16}
            className="h-4 w-4"
            aria-hidden="true"
          />
          {likeCount.toLocaleString()}
        </span>
        <button type="button" onClick={onViewWork} className="flex items-center gap-0.5 text-xs text-gray-900">
          작업물 보기
          <Image src={ICONS.out} alt="" width={14} height={14} className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default function List({ items, onItemClick }) {
  return (
    <div className="flex w-[842px] flex-col items-start gap-3">
      {items.map((item) => (
        <ListItem
          key={item.id}
          rank={item.rank}
          name={item.name}
          role={item.role}
          likeCount={item.likeCount}
          liked={item.liked}
          onViewWork={() => onItemClick?.(item)}
        />
      ))}
    </div>
  );
}
