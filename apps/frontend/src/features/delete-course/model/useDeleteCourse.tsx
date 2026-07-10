import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { lmsCoursesService } from "@/shared/api";
import { useInvalidateCourses } from "@/entities/courses/queries";

export function useDeleteCourse({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateCourses = useInvalidateCourses();

  const { mutate: deleteCourse, isPending } = useMutation({
    mutationFn: (courseId: number) => lmsCoursesService.delete(courseId),
    async onSuccess(response) {
      invalidateCourses();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { deleteCourse, isPending };
}
