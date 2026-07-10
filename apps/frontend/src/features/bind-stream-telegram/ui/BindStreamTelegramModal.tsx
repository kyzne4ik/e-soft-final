import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { BindStreamTelegramForm } from "./BindStreamTelegramForm";

export type BindStreamTelegramModalProps = Pick<
  ModalProps,
  "isOpen" | "onClose"
>;

export function BindStreamTelegramModal(props: BindStreamTelegramModalProps) {
  return (
    <Modal {...props} title="Привязка Telegram-канала">
      <Modal.Body>
        <BindStreamTelegramForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <BindStreamTelegramForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
