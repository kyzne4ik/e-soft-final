import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { UpdateStreamForm } from "./UpdateStreamForm";

export type UpdateStreamModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function UpdateStreamModal(props: UpdateStreamModalProps) {
  return (
    <Modal {...props} title="Редактирование потока">
      <Modal.Body>
        <UpdateStreamForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <UpdateStreamForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
