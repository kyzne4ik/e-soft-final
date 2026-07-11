import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { CreateLeadForm } from "./CreateLeadForm";

export type CreateLeadModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function CreateLeadModal(props: CreateLeadModalProps) {
  return (
    <Modal {...props} title="Новая заявка">
      <Modal.Body>
        <CreateLeadForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <CreateLeadForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
