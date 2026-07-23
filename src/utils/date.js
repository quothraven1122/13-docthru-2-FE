const dateUtils = {
  //dateFormat 함수
  format(rawDate, type = "ko") {
    const d = rawDate instanceof Date ? rawDate : new Date(rawDate);

    switch (type) {
      case "dot":
        return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, "0")}. ${String(d.getDate()).padStart(2, "0")}. ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
      case "ko":
      default:
        return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    }
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
