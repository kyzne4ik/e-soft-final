import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { CreateUserForm } from "./CreateUserForm";

export type CreateUserModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function CreateUserModal(props: CreateUserModalProps) {
  return (
    <Modal {...props} title="Новый пользователь">
      <Modal.Body>
        <CreateUserForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <CreateUserForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
