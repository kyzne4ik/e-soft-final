import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { CreateCoursePayload } from "@repo/schemas";
import { lmsCoursesService } from "@/shared/api";
import { useInvalidateCourses } from "@/entities/courses/queries";

export function useCreateCourse({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateCourses = useInvalidateCourses();

  const { mutateAsync: createCourseAsync, isPending } = useMutation({
    mutationFn: (payload: CreateCoursePayload) =>
      lmsCoursesService.create(payload),
    async onSuccess(response) {
      invalidateCourses();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { createCourseAsync, isPending };
}
