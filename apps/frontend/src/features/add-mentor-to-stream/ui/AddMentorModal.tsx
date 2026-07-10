import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { AddMentorForm } from "./AddMentorForm";

export type AddMentorModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function AddMentorModal(props: AddMentorModalProps) {
  return (
    <Modal {...props} title="Добавление ментора">
      <Modal.Body>
        <AddMentorForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <AddMentorForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
