export const maskPhone = (phone: any) => {
  const visibleDigits = 2;
  const maskedPart = "*".repeat(phone.length - visibleDigits);
  const visiblePart = phone.slice(-visibleDigits);
  return maskedPart + visiblePart;
};
