import type { ReactNode } from "react";
import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { UpdateLessonForm } from "./UpdateLessonForm";

export type UpdateLessonModalProps = Pick<ModalProps, "isOpen" | "onClose"> & {
  renderSlot?: ReactNode;
};

export function UpdateLessonModal({
  renderSlot,
  ...props
}: UpdateLessonModalProps) {
  return (
    <Modal {...props} title="Редактирование занятия">
      <Modal.Body>
        <UpdateLessonForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        {renderSlot}
        <UpdateLessonForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
