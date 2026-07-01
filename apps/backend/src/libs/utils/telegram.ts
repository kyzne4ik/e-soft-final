export const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const linkLine = (meetingLink: string | null): string | null =>
  meetingLink
    ? `🔗 <a href="${escapeHtml(meetingLink)}">Подключиться к встрече</a>`
    : null;
