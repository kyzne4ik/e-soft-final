import { usersService } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import type { UpdateUserPayload } from "@repo/schemas";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { useInvalidateUsers } from "@/entities/user/queries";

export function useUpdateUser(
  userId: number,
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
  const invalidateUsers = useInvalidateUsers();

  const { mutateAsync: updateUserAsync, isPending } = useMutation({
    mutationFn: (payload: UpdateUserPayload) =>
      usersService.update(userId, payload),
    async onSuccess(response) {
      invalidateUsers();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { updateUserAsync, isPending };
}
