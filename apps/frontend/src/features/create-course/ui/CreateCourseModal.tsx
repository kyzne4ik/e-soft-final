import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { CreateCourseForm } from "./CreateCourseForm";

export type CreateCourseModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function CreateCourseModal(props: CreateCourseModalProps) {
  return (
    <Modal {...props} title="Новый курс">
      <Modal.Body>
        <CreateCourseForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <CreateCourseForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
