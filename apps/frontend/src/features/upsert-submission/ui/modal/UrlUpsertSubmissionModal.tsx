import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { taskByIdQuery } from "@/entities/tasks";
import { UpsertSubmissionModal } from "./UpsertSubmissionModal";

const URL_PARAM = "taskId";

export function UrlUpsertSubmissionModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = Number(searchParams.get(URL_PARAM)) || null;

  const { data } = useQuery({
    ...taskByIdQuery(taskId ?? 0),
    enabled: taskId != null,
  });
  const task = data?.data ?? null;

  const onClose = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete(URL_PARAM);
      return next;
    });
  };

  if (taskId == null || task == null) return null;

  return <UpsertSubmissionModal task={task} isOpen onClose={onClose} />;
}
