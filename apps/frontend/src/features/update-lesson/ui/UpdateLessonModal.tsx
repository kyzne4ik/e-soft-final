import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { UpdateLessonForm } from "./UpdateLessonForm";

export type UpdateLessonModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function UpdateLessonModal(props: UpdateLessonModalProps) {
  return (
    <Modal {...props} title="Редактирование занятия">
      <Modal.Body>
        <UpdateLessonForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <UpdateLessonForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
