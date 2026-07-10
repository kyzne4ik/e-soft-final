import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { SubmitSolutionForm } from "./SubmitSolutionForm";

export type SubmitSolutionModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export function SubmitSolutionModal(props: SubmitSolutionModalProps) {
  return (
    <Modal {...props} title="Сдать решение">
      <Modal.Body>
        <SubmitSolutionForm.Fields />
      </Modal.Body>
      <Modal.Footer>
        <SubmitSolutionForm.SubmitButton />
      </Modal.Footer>
    </Modal>
  );
}
