import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import { BindStreamTelegramForm } from "./BindStreamTelegramForm";
import { BindStreamTelegramModal } from "./BindStreamTelegramModal";
import type { BindStreamTelegramFormData } from "../model/types";

export interface BindStreamTelegramButtonProps {
  streamId: number;
}

export function BindStreamTelegramButton({
  streamId,
}: BindStreamTelegramButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <BindStreamTelegramForm streamId={streamId} onSuccess={onClose}>
      <Tooltip text="Привязать Telegram-канал" position="bottom_right">
        <BaseBindStreamTelegramButton onOpen={onOpen} />
      </Tooltip>
      <BindStreamTelegramModal isOpen={isOpen} onClose={onClose} />
    </BindStreamTelegramForm>
  );
}

function BaseBindStreamTelegramButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<BindStreamTelegramFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Привязать Telegram-канал"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="send" size={18} />
    </Button>
  );
}
