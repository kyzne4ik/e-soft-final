import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { CreateTaskForm } from "./CreateTaskForm";

export type CreateTaskModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function CreateTaskModal(props: CreateTaskModalProps) {
  return (
    <Modal {...props} title="Новая задача">
      <Modal.Body>
        <CreateTaskForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <CreateTaskForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
