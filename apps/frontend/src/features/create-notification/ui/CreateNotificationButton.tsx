import { Icon } from "@repo/ui/atoms/icon";
import { Button } from "@repo/ui/atoms/button";
import { useFormContext } from "react-hook-form";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import type { CreateNotificationFormData } from "../model/types";
import { CreateNotificationForm } from "./CreateNotificationForm";
import { CreateNotificationModal } from "./CreateNotificationModal";

export interface CreateNotificationButtonProps {
  defaultUserId?: string;
  sub?: string;
}

export function CreateNotificationButton({
  defaultUserId,
  sub,
}: CreateNotificationButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateNotificationForm onSuccess={onClose} defaultUserId={defaultUserId}>
      <Tooltip text="Создать уведомление" position="left">
        <BaseCreateNotificationButton onOpen={onOpen} />
      </Tooltip>
      <CreateNotificationModal
        isOpen={isOpen}
        onClose={onClose}
        sub={sub}
        hideRecipient={!!defaultUserId}
      />
    </CreateNotificationForm>
  );
}

function BaseCreateNotificationButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<CreateNotificationFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Создать уведомление"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="plus" size={18} />
    </Button>
  );
}
