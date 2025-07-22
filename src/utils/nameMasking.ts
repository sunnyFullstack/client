export const maskName = (fullName: string) => {
  if (!fullName) return "";

  return fullName
    .trim()
    .split(/\s+/)
    .map((name) => {
      if (name.length <= 1) return "*";
      return name[0] + "*".repeat(name.length - 1);
    })
    .join(" ");
};
