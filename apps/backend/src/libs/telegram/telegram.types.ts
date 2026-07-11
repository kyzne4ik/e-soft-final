export interface ITelegramService {
  sendToUser(tgId: number | string, text: string): Promise<void>;
  sendToTopic(
    chatId: number | string,
    threadId: number,
    text: string,
  ): Promise<void>;
}
