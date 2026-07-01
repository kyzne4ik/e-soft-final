import { AppConfig } from "@config";

export class DateToolKit {
  private static readonly TIMEZONE = AppConfig.APP_TIMEZONE;

  static dateFmt = {
    format: (date: Date | number | string): string => {
      const d = new Date(date);
      return DateToolKit.formatWithTimezone(d, {
        day: "numeric",
        month: "long",
      });
    },
  };

  static timeFmt = {
    format: (date: Date | number | string): string => {
      const d = new Date(date);
      return DateToolKit.formatWithTimezone(d, {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  };

  private static formatWithTimezone(
    date: Date,
    options: Intl.DateTimeFormatOptions,
  ): string {
    return new Intl.DateTimeFormat("ru-RU", {
      ...options,
      timeZone: DateToolKit.TIMEZONE,
    }).format(date);
  }
}
