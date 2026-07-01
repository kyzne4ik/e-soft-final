import { StringToolKit } from "@utils";

export class StartTemplate {
  static welcome(username?: string): string {
    return StringToolKit.compose([
      username ? `👋 Привет, ${username}!` : "👋 Привет!",
      "Добро пожаловать в Школу Программирования Esoft 🎓",
      "Мы обучаем Full-Stack разработке: Frontend (HTML, CSS, JS, React) и Backend (Node.js, PostgreSQL).",
    ]);
  }

  static linkSuccess(): string {
    return "✅ Telegram успешно привязан!";
  }

  static linkInvalid(): string {
    return "❌ Ссылка недействительна или истекла.";
  }

  static alreadyLinked(): string {
    return "❌ Этот Telegram уже привязан к другому аккаунту.";
  }
}
