import { type ChangeEvent } from "react";
import { Select } from "@repo/ui/atoms/select";
import type { StudentStatus } from "@repo/schemas";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useChangeStudentStatus } from "../model/useChangeStudentStatus";
import { STUDENT_STATUS_OPTIONS } from "../model/statusOptions";

export interface ChangeStudentStatusSelectProps {
  streamId: number;
  studentId: number;
  currentStatus: StudentStatus;
}

export function ChangeStudentStatusSelect({
  streamId,
  studentId,
  currentStatus,
}: ChangeStudentStatusSelectProps) {
  const { getToast } = useToast();

  const { changeStatus, isPending } = useChangeStudentStatus({
    async onSuccess() {
      await getToast({ type: "success", message: "Статус студента обновлён" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при смене статуса",
      });
    },
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as StudentStatus;
    if (status !== currentStatus) {
      changeStatus({ streamId, studentId, status });
    }
  };

  return (
    <Select
      aria-label="Статус студента"
      value={currentStatus}
      disabled={isPending}
      options={STUDENT_STATUS_OPTIONS}
      onChange={handleChange}
    />
  );
}
