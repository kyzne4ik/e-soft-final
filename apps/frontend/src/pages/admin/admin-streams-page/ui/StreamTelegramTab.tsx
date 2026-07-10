import { Icon } from "@repo/ui/atoms/icon";
import { useQuery } from "@tanstack/react-query";
import css from "../AdminStreamsPage.module.css";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { streamTelegramQuery } from "@/entities/streams";
import { BindStreamTelegramButton } from "@/features/bind-stream-telegram";
import { UnbindStreamTelegramButton } from "@/features/unbind-stream-telegram";

interface StreamTelegramTabProps {
  streamId: number;
}

export function StreamTelegramTab({ streamId }: StreamTelegramTabProps) {
  const { data, isLoading } = useQuery({
    ...streamTelegramQuery(streamId),
    throwOnError: false,
  });

  const telegram = data?.data ?? null;

  return (
    <div className={css.telegram}>
      <div className={css.telegram_section}>
        <div className={css.telegram_row}>
          <span className={css.telegram_label}>Telegram-канал</span>
          <div className={css.telegram_actions}>
            {isLoading ? (
              <Skeleton width={120} height={28} border="var(--radius-md)" />
            ) : telegram ? (
              <UnbindStreamTelegramButton streamId={streamId} />
            ) : (
              <BindStreamTelegramButton streamId={streamId} />
            )}
          </div>
        </div>

        {!isLoading && telegram && (
          <div className={css.telegram_info}>
            <div className={css.telegram_field}>
              <span className={css.telegram_field_label}>ID чата</span>
              <code className={css.telegram_field_value}>
                {telegram.chatId}
              </code>
            </div>
            {telegram.announceThreadId != null && (
              <div className={css.telegram_field}>
                <span className={css.telegram_field_label}>Тред анонсов</span>
                <code className={css.telegram_field_value}>
                  {telegram.announceThreadId}
                </code>
              </div>
            )}
          </div>
        )}

        {!isLoading && !telegram && (
          <div className={css.telegram_empty}>
            <Icon name="bot" size={32} />
            <span>
              Канал не привязан. Привяжите Telegram-канал, чтобы отправлять
              уведомления студентам.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
