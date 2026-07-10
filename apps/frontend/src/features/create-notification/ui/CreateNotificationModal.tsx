import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { CreateNotificationForm } from "./CreateNotificationForm";

export type CreateNotificationModalProps = Pick<
  ModalProps,
  "isOpen" | "onClose"
> & {
  sub?: string;
  hideRecipient?: boolean;
};

export function CreateNotificationModal({
  sub,
  hideRecipient,
  ...props
}: CreateNotificationModalProps) {
  return (
    <Modal {...props} title="Новое уведомление" sub={sub}>
      <Modal.Body>
        <CreateNotificationForm.Fields hideRecipient={hideRecipient} />
      </Modal.Body>
      <Modal.Footer>
        <CreateNotificationForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
