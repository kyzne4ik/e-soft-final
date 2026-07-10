import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import type { CreateLeadFormData } from "../model/types";
import { CreateLeadForm } from "./CreateLeadForm";
import { CreateLeadModal } from "./CreateLeadModal";

export function CreateLeadButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateLeadForm onSuccess={onClose}>
      <Tooltip text="Новая заявка" position="bottom_right">
        <BaseCreateLeadButton onOpen={onOpen} />
      </Tooltip>
      <CreateLeadModal isOpen={isOpen} onClose={onClose} />
    </CreateLeadForm>
  );
}

function BaseCreateLeadButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<CreateLeadFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Новая заявка"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="plus" size={18} />
    </Button>
  );
}
