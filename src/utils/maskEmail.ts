export const maskEmail = (email: string) => {
  const [user, domain] = email.split("@");
  const masked = "*".repeat(user.length);
  return `${masked}@${domain}`;
};
