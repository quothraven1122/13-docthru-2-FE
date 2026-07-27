import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { challengeService } from "@/services/challengeService";
import { SORT_VALUE_TO_STATUS } from "@/constants/challengeOptions";

// 드롭다운 sort 값을 BE 파라미터(status/sort)로 분기
function toApiParams({ keyword, sort, page, pageSize }) {
  const params = { page, pageSize };
  if (keyword) params.keyword = keyword;

  if (sort) {
    if (SORT_VALUE_TO_STATUS[sort]) {
      params.status = SORT_VALUE_TO_STATUS[sort]; // pending/approved/rejected
    } else {
      params.sort = sort; // appliedAtAsc 등
    }
  }
  return params;
}

export function useApplications({ keyword, sort, page, pageSize = 10 }) {
  const params = toApiParams({ keyword, sort, page, pageSize });

  return useQuery({
    queryKey: ["applications", params],
    queryFn: () => challengeService.getApplications(params),
    placeholderData: (prev) => prev, // 페이지 전환 시 이전 데이터 유지 (깜빡임 방지)
  });
}

export function useApplicationDetail(challengeId) {
  return useQuery({
    queryKey: ["application", challengeId],
    queryFn: () => challengeService.getApplicationDetail(challengeId),
    enabled: !!challengeId,
  });
}

// 승인/거절 (성공 시 상세•목록 캐시 무효화 -> 제자리 갱신)
export function useApplicationMutations(challengeId) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["application", challengeId] });
    queryClient.invalidateQueries({ queryKey: ["applications"] });
  };

  const approve = useMutation({
    mutationFn: () => challengeService.approveApplication(challengeId),
    onSuccess: invalidate,
  });

  const reject = useMutation({
    mutationFn: (reason) => challengeService.rejectApplication(challengeId, reason),
    onSuccess: invalidate,
  });

  return { approve, reject };
}
