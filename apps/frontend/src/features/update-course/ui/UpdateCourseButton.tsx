import { Icon } from "@repo/ui/atoms/icon";
import { Button } from "@repo/ui/atoms/button";
import type { CourseResponse } from "@repo/schemas";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { UpdateCourseForm } from "./UpdateCourseForm";
import { UpdateCourseModal } from "./UpdateCourseModal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";

export interface UpdateCourseButtonProps {
  course: CourseResponse;
}

export function UpdateCourseButton({ course }: UpdateCourseButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <UpdateCourseForm course={course}>
        <Tooltip text="Редактировать курс" position="left">
          <Button
            isIconOnly
            variant="ghost"
            aria-label="Редактировать курс"
            onClick={onOpen}
          >
            <Icon name="pencil" size={18} />
          </Button>
        </Tooltip>
        <UpdateCourseModal isOpen={isOpen} onClose={onClose} />
      </UpdateCourseForm>
    </>
  );
}
