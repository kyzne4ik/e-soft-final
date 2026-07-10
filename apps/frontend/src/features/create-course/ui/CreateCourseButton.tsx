import { Icon } from "@repo/ui/atoms/icon";
import { Button } from "@repo/ui/atoms/button";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import type { CreateCourseFormData } from "../model/types";
import { CreateCourseForm } from "./CreateCourseForm";
import { CreateCourseModal } from "./CreateCourseModal";

export function CreateCourseButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateCourseForm onSuccess={onClose}>
      <Tooltip text="Создать курс" position="bottom_right">
        <BaseCreateCourseButton onOpen={onOpen} />
      </Tooltip>
      <CreateCourseModal isOpen={isOpen} onClose={onClose} />
    </CreateCourseForm>
  );
}

function BaseCreateCourseButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<CreateCourseFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Создать курс"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="plus" size={18} />
    </Button>
  );
}
