export const truncateText = (text: string, wordLimit: number) => {
  if (typeof text !== "string") {
    return "";
  }

  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};
