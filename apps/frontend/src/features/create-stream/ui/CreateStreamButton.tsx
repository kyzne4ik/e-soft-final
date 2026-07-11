import { Button } from "@repo/ui/atoms/button";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { CreateStreamModal } from "./CreateStreamModal";
import { CreateStreamForm } from "./CreateStreamForm";
import { Icon } from "@repo/ui/atoms/icon";
import css from "./CreateStreamForm.module.css";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { classNames } from "@repo/ui/libs/classNames";
import { useFormContext } from "react-hook-form";
import type { CreateStreamFormData } from "../model/types";

export interface CreateStreamButtonProps {
  className?: string;
}

export function CreateStreamButton({ className }: CreateStreamButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateStreamForm onSuccess={onClose}>
      <Tooltip text="Создать поток" position="top">
        <BaseCreateStreamButton className={className} onOpen={onOpen} />
      </Tooltip>
      <CreateStreamModal isOpen={isOpen} onClose={onClose} />
    </CreateStreamForm>
  );
}

function BaseCreateStreamButton({
  className,
  onOpen,
}: {
  className?: string;
  onOpen: () => void;
}) {
  const { formState } = useFormContext<CreateStreamFormData>();

  return (
    <Button
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
      variant="ghost"
      isIconOnly
      aria-label="Создать поток"
      className={classNames(css.button, {}, [className])}
    >
      <Icon name="plus" size={18} />
    </Button>
  );
}
