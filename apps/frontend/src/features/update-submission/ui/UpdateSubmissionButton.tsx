import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import type { SubmissionResponse } from "@repo/schemas";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { UpdateSubmissionModal } from "./UpdateSubmissionModal";

export interface UpdateSubmissionButtonProps {
  submission: SubmissionResponse;
}

export function UpdateSubmissionButton({
  submission,
}: UpdateSubmissionButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip text="Редактировать решение" position="top">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Редактировать решение"
          onClick={onOpen}
        >
          <Icon name="pencil" size={18} />
        </Button>
      </Tooltip>

      <UpdateSubmissionModal
        submission={submission}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
