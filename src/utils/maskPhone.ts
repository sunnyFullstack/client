export const maskPhone = (phone: string): string => {
  if (phone.length <= 6) return "*".repeat(phone.length); // fallback for short inputs

  const start = phone.slice(0, 2);
  const masked = "*".repeat(6);
  const end = phone.slice(-2);
  return `${start}${masked}${end}`;
};
