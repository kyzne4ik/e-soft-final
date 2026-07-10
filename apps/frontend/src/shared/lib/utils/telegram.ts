export const atUsername = (username: string): string => {
  if (!username) return "";

  const cleaned = username.trim().replace(/@/g, "").toLowerCase();

  if (!cleaned) return "";

  return `@${cleaned}`;
};
