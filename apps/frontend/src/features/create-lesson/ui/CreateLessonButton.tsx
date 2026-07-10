import { Icon } from "@repo/ui/atoms/icon";
import { Button } from "@repo/ui/atoms/button";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { CreateLessonForm } from "./CreateLessonForm";
import { CreateLessonModal } from "./CreateLessonModal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";

export interface CreateLessonButtonProps {
  streamId: number;
}

export function CreateLessonButton({ streamId }: CreateLessonButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateLessonForm streamId={streamId} onSuccess={onClose}>
      <Tooltip text="Новое занятие" position="bottom_right">
        <Button isIconOnly aria-label="Новое занятие" onClick={onOpen}>
          <Icon name="plus" size={18} />
        </Button>
      </Tooltip>
      <CreateLessonModal isOpen={isOpen} onClose={onClose} />
    </CreateLessonForm>
  );
}
