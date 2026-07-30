const dateUtils = {
  //dateFormat 함수
  format(rawDate) {
    const d = rawDate instanceof Date ? rawDate : new Date(rawDate);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  },

  // '/'로 날짜 표기하는 함수
  formatDateSlash(rawDate) {
    const d = rawDate instanceof Date ? rawDate : new Date(rawDate);
    const year = String(d.getFullYear()).slice(-2);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  },

  // 시간도 표기 하는 함수
  formatDateTime(rawDate) {
    const d = rawDate instanceof Date ? rawDate : new Date(rawDate);
    const year = String(d.getFullYear()).slice(-2);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hour = String(d.getHours()).padStart(2, "0");
    const minute = String(d.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hour}:${minute}`;
  },

  //데드라인 유효성 검사 함수 입니다.
  isPastDeadline(date) {
    const match = date?.match(/(\d+)년\s*(\d+)월\s*(\d+)일/);
    if (!match) return false;

    const [, year, month, day] = match;
    const deadline = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return deadline < startOfToday;
  },
};

export default dateUtils;
