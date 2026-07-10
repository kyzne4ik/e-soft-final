import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { UpdateCoursePayload } from "@repo/schemas";
import { lmsCoursesService } from "@/shared/api";
import { useInvalidateCourses } from "@/entities/courses/queries";

export function useUpdateCourse(
  courseId: number,
  {
    onSuccess,
    onError,
    onSettled,
  }: {
    onSuccess?: (data: AxiosResponse) => void;
    onError?: (error: AxiosError<ApiErrorResponse>) => void;
    onSettled?: () => void;
  } = {},
) {
  const invalidateCourses = useInvalidateCourses();

  const { mutateAsync: updateCourseAsync, isPending } = useMutation({
    mutationFn: (payload: UpdateCoursePayload) =>
      lmsCoursesService.update(courseId, payload),
    async onSuccess(response) {
      invalidateCourses();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { updateCourseAsync, isPending };
}
