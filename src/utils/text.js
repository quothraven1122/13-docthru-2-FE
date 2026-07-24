const textUtils = {
  truncateText(text, maxLength) {
    if (!text) return "";
    return `${text.slice(0, maxLength)}${text.length > maxLength ? "..." : ""}`;
  },
};

export default textUtils;
