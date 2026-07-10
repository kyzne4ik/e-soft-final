import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { CreateStreamForm } from "./CreateStreamForm";

export type CreateStreamModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function CreateStreamModal(props: CreateStreamModalProps) {
  return (
    <Modal {...props} title="Новый поток">
      <Modal.Body>
        <CreateStreamForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <CreateStreamForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
