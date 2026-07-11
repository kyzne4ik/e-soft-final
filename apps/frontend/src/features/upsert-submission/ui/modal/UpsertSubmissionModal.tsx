import type { TaskResponse } from "@repo/schemas";
import { useSubmissionDetail } from "./useSubmissionDetail";
import { UpsertSubmissionTask } from "./UpsertSubmissionTask";
import { UpsertSubmissionForm } from "../UpsertSubmissionForm";
import { Modal, type ModalProps } from "@repo/ui/organisms/modal";

export type UpsertSubmissionModalProps = Omit<ModalProps, "children"> & {
  task: TaskResponse;
};

export function UpsertSubmissionModal({
  task,
  isOpen,
  onClose,
}: UpsertSubmissionModalProps) {
  const { submission, canSubmit, submitLabel, sub } = useSubmissionDetail(
    task,
    isOpen,
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task.title}
      sub={sub}
      size="default"
    >
      <Modal.Body>
        <UpsertSubmissionTask task={task} isOpen={isOpen} />
      </Modal.Body>

      {canSubmit && (
        <UpsertSubmissionForm
          taskId={task.id}
          submissionId={submission?.id}
          onSuccess={onClose}
          defaultRepoLink={submission?.repoLink}
        >
          <Modal.Body>
            <UpsertSubmissionForm.Fields />
          </Modal.Body>
          <Modal.Footer>
            <UpsertSubmissionForm.SubmitButton label={submitLabel} />
          </Modal.Footer>
        </UpsertSubmissionForm>
      )}
    </Modal>
  );
}
