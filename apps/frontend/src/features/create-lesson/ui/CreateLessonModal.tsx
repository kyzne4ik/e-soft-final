import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { CreateLessonForm } from "./CreateLessonForm";

export type CreateLessonModalProps = Pick<
  ModalProps,
  "isOpen" | "onClose"
> & {};

export function CreateLessonModal(props: CreateLessonModalProps) {
  return (
    <Modal {...props} title="Новое занятие">
      <Modal.Body>
        <CreateLessonForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <CreateLessonForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
