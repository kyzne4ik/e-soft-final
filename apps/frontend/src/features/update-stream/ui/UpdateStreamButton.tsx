import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import type { StreamResponse } from "@repo/schemas";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import { UpdateStreamForm } from "./UpdateStreamForm";
import { UpdateStreamModal } from "./UpdateStreamModal";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import type { UpdateStreamFormData } from "../model/types";

export interface UpdateStreamButtonProps {
  stream: StreamResponse;
}

export function UpdateStreamButton({ stream }: UpdateStreamButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <UpdateStreamForm stream={stream} onSuccess={onClose}>
      <Tooltip text="Редактировать поток" position="top">
        <BaseUpdateStreamButton onOpen={onOpen} />
      </Tooltip>
      <UpdateStreamModal isOpen={isOpen} onClose={onClose} />
    </UpdateStreamForm>
  );
}

function BaseUpdateStreamButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<UpdateStreamFormData>();

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label="Редактировать поток"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="pencil" size={18} />
    </Button>
  );
}
