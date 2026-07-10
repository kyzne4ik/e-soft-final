import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import type { SubmissionResponse } from "@repo/schemas";
import { UpdateSubmissionForm } from "./UpdateSubmissionForm";

export type UpdateSubmissionModalProps = Pick<
  ModalProps,
  "isOpen" | "onClose"
> & {
  submission: SubmissionResponse;
};

export function UpdateSubmissionModal({
  submission,
  onClose,
  ...props
}: UpdateSubmissionModalProps) {
  return (
    <Modal {...props} onClose={onClose} title="Редактирование решения">
      <UpdateSubmissionForm submission={submission} onSuccess={onClose}>
        <Modal.Body>
          <UpdateSubmissionForm.Fields />
        </Modal.Body>
        <Modal.Footer>
          <UpdateSubmissionForm.SubmitButton />
        </Modal.Footer>
      </UpdateSubmissionForm>
    </Modal>
  );
}
