export const maskName = (fullName: string): string => {
  if (!fullName) return "";

  return fullName
    .trim()
    .split(/\s+/)
    .map((name) => {
      if (name.length <= 3) {
        return name[0] + "*".repeat(name.length - 1); // fallback for short names
      }

      const mid = Math.floor((name.length - 3) / 2);
      return name.slice(0, mid) + "***" + name.slice(mid + 3);
    })
    .join(" ");
};
