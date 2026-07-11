import { Send } from "lucide-react";
import { Button } from "@repo/ui/atoms/button";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { CreateInviteForm } from "./CreateInviteForm";
import { CreateInviteModal } from "./CreateInviteModal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import type { CreateInviteFormData } from "../model/types";

export function CreateInviteButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateInviteForm onSuccess={onClose}>
      <Tooltip text="Отправить инвайт" position="bottom">
        <BaseCreateInviteButton onOpen={onOpen} />
      </Tooltip>
      <CreateInviteModal isOpen={isOpen} onClose={onClose} />
    </CreateInviteForm>
  );
}

function BaseCreateInviteButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<CreateInviteFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Отправить инвайт"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Send size={24} />
    </Button>
  );
}
