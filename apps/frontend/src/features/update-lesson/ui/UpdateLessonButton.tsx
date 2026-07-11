import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import type { LessonsResponse } from "@repo/schemas";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { UpdateLessonModal } from "./UpdateLessonModal";
import { UpdateLessonForm } from "./UpdateLessonForm";

export interface UpdateLessonButtonProps {
  lesson: LessonsResponse;
}

export function UpdateLessonButton({ lesson }: UpdateLessonButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <UpdateLessonForm lesson={lesson} onSuccess={onClose}>
      <Tooltip text="Редактировать занятие" position="left">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Редактировать занятие"
          onClick={onOpen}
        >
          <Icon name="pencil" size={18} />
        </Button>
      </Tooltip>
      <UpdateLessonModal isOpen={isOpen} onClose={onClose} />
    </UpdateLessonForm>
  );
}
