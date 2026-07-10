import type { ReactNode } from "react";
import { Modal } from "../modal";
import { Button } from "../../atoms/button";

export type ConfirmTone = "default" | "danger";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmTone;
  isPending?: boolean;
  onConfirm: () => void;
}

export function ConfirmModal({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "Подтвердить",
  cancelLabel = "Отмена",
  tone = "default",
  isPending = false,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      {description ? <Modal.Body>{description}</Modal.Body> : null}
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} isDisabled={isPending}>
          {cancelLabel}
        </Button>
        <Button
          variant={tone === "danger" ? "destructive" : "primary"}
          onClick={onConfirm}
          isPending={isPending}
          isDisabled={isPending}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
