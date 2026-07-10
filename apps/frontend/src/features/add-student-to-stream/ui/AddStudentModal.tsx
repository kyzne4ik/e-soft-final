import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { AddStudentForm } from "./AddStudentForm";

export type AddStudentModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function AddStudentModal(props: AddStudentModalProps) {
  return (
    <Modal {...props} title="Добавление студента">
      <Modal.Body>
        <AddStudentForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <AddStudentForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
