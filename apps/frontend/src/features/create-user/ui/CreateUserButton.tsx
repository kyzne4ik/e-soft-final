import { Button } from "@repo/ui/atoms/button";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import { CreateUserModal } from "./CreateUserModal";
import { CreateUserForm } from "./CreateUserForm";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { Plus } from "lucide-react";
import type { CreateUserFormData } from "../model/types";

export function CreateUserButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateUserForm onSuccess={onClose}>
      <Tooltip text="Создать пользователя" position="bottom_right">
        <BaseCreateUserButton onOpen={onOpen} />
      </Tooltip>
      <CreateUserModal isOpen={isOpen} onClose={onClose} />
    </CreateUserForm>
  );
}

function BaseCreateUserButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<CreateUserFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Создать пользователя"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Plus size={24} />
    </Button>
  );
}
