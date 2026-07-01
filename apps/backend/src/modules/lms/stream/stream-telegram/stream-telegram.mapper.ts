import { StreamTelegramDto, StreamTelegramResponse } from "@repo/schemas";

export const streamTelegramMap = (
  st: StreamTelegramDto,
): StreamTelegramResponse => ({
  id: st.id,
  streamId: st.streamId,
  chatId: st.chatId,
  announceThreadId: st.announceThreadId,
});
