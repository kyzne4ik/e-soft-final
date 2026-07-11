import { StringToolKit } from "@utils";

export class TopicTemplate {
  static notInTopic(): string {
    return "Запусти команду внутри нужного топика.";
  }

  static ids(chatId: number, threadId: number): string {
    return StringToolKit.compose([
      `chatId: <code>${chatId}</code>`,
      `topicId: <code>${threadId}</code>`,
    ]);
  }
}
