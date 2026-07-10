import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { CreateInviteForm } from "./CreateInviteForm";

export type CreateInviteModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function CreateInviteModal({
  onClose,
  ...props
}: CreateInviteModalProps) {
  return (
    <Modal {...props} onClose={onClose} title="Отправить приглашение">
      <CreateInviteForm onSuccess={onClose}>
        <Modal.Body>
          <CreateInviteForm.Fields />
        </Modal.Body>
        <Modal.Footer>
          <CreateInviteForm.SubmitButton />
        </Modal.Footer>
      </CreateInviteForm>
    </Modal>
  );
}
