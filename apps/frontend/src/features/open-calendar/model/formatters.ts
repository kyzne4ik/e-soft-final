const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
});

export const formatLessonDate = (date: Date): string =>
  dateFormatter.format(date);

export const formatLessonTime = (date: Date): string =>
  timeFormatter.format(date);
