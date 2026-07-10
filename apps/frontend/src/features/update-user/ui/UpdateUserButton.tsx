import { Icon } from "@repo/ui/atoms/icon";
import { Button } from "@repo/ui/atoms/button";
import { useFormContext } from "react-hook-form";
import { UpdateUserForm } from "./UpdateUserForm";
import type { UserResponse } from "@repo/schemas";
import { UpdateUserModal } from "./UpdateUserModal";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import type { UpdateUserFormData } from "../model/types";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";

export interface UpdateUserButtonProps {
  user: UserResponse;
}

export function UpdateUserButton({ user }: UpdateUserButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <UpdateUserForm user={user} onSuccess={onClose}>
      <Tooltip text="Редактировать пользователя" position="left">
        <BaseUpdateUserButton onOpen={onOpen} />
      </Tooltip>
      <UpdateUserModal isOpen={isOpen} onClose={onClose} />
    </UpdateUserForm>
  );
}

function BaseUpdateUserButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<UpdateUserFormData>();

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label="Редактировать пользователя"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="pencil" size={18} />
    </Button>
  );
}
