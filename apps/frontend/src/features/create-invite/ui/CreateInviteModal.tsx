import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { CreateInviteForm } from "./CreateInviteForm";

export type CreateInviteModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function CreateInviteModal(props: CreateInviteModalProps) {
  return (
    <Modal {...props} title="Отправить приглашение">
      <Modal.Body>
        <CreateInviteForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <CreateInviteForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
