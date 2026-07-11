import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Text } from "@repo/ui/atoms/text";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useGenerateTelegramLink } from "../model/useGenerateTelegramLink";
import css from "./GenerateTelegramLinkButton.module.css";

export function GenerateTelegramLinkButton() {
  const { getToast } = useToast();

  const { generateLink, isPending, link } = useGenerateTelegramLink({
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Не удалось создать ссылку",
      });
    },
  });

  return (
    <div className={css.row}>
      <Tooltip text="Привязать Telegram" position="left">
        <Button
          isIconOnly
          aria-label="Привязать Telegram"
          isPending={isPending}
          isDisabled={isPending}
          onClick={() => generateLink()}
        >
          <Icon name="link" size={18} />
        </Button>
      </Tooltip>
      {link ? (
        <Tooltip
          position="top_right"
          text="Откройте ссылку в Telegram и нажмите «Start», чтобы завершить привязку"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            <Text.P2Link>Открыть ссылку привязки</Text.P2Link>
          </a>
        </Tooltip>
      ) : null}
    </div>
  );
}
