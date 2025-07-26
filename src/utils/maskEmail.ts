export const maskEmail = (email: string): string => {
  const [user, domain] = email.split("@");
  const masked = "*".repeat(Math.min(6, user.length));
  const visible = user.slice(6);
  return `${masked}${visible}@${domain}`;
};
