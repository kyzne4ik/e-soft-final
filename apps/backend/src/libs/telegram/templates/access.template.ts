export class AccessTemplate {
  static notLinked(): string {
    return "❌ Сначала привяжите аккаунт командой /start.";
  }

  static accountNotFound(): string {
    return "❌ Аккаунт не найден.";
  }

  static forbidden(): string {
    return "⛔ Недостаточно прав для этой команды.";
  }
}
