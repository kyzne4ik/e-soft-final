import { useQuery } from "@tanstack/react-query";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import type { TaskResponse } from "@repo/schemas";
import { TaskCard } from "@repo/ui/molecules/task-card";
import { studentSubmissionByTaskQuery } from "@/entities/submissions";
import { UpsertSubmissionModal } from "./modal/UpsertSubmissionModal";

function formatDeadline(deadline: Date): string {
  return deadline.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

export interface TaskCardWithModalProps {
  task: TaskResponse;
}

export function TaskCardWithModal({ task }: TaskCardWithModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery(studentSubmissionByTaskQuery(task.id));

  const status = data?.data?.submission?.status;

  return (
    <>
      <TaskCard
        title={task.title}
        description={task.description}
        deadline={formatDeadline(new Date(task.deadline))}
        status={status}
        statusKind="submission"
        onClick={onOpen}
      />
      <UpsertSubmissionModal task={task} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
