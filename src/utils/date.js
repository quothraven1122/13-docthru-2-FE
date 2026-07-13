const dateUtils = {
  format(rawDate) {
    const d = rawDate instanceof Date ? rawDate : new Date(rawDate);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  },

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
