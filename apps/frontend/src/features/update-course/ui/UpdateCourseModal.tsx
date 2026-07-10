import { UpdateCourseForm } from "./UpdateCourseForm";
import { Modal, type ModalProps } from "@repo/ui/organisms/modal";

export type UpdateCourseModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function UpdateCourseModal(props: UpdateCourseModalProps) {
  return (
    <Modal {...props} title="Редактирование курса">
      <Modal.Body>
        <UpdateCourseForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <UpdateCourseForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
