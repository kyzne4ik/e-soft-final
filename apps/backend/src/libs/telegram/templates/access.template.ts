export class AccessTemplate {
  static notLinked(): string {
    return "❌ Сначала привяжите аккаунт командой /start.";
  }

  static forbidden(): string {
    return "⛔ Недостаточно прав для этой команды.";
  }
}
