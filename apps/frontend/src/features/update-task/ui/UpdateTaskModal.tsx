import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { UpdateTaskForm } from "./UpdateTaskForm";

export type UpdateTaskModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function UpdateTaskModal(props: UpdateTaskModalProps) {
  return (
    <Modal {...props} title="Редактирование задачи">
      <Modal.Body>
        <UpdateTaskForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <UpdateTaskForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
