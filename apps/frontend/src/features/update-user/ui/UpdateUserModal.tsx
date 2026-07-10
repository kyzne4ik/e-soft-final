import { UpdateUserForm } from "./UpdateUserForm";
import { Modal, type ModalProps } from "@repo/ui/organisms/modal";

export type UpdateUserModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function UpdateUserModal(props: UpdateUserModalProps) {
  return (
    <Modal {...props} title="Редактирование пользователя">
      <Modal.Body>
        <UpdateUserForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <UpdateUserForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
