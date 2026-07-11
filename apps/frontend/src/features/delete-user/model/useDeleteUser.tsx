import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { usersService } from "@/shared/api";
import { useInvalidateUsers } from "@/entities/user/queries";

export function useDeleteUser({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateUsers = useInvalidateUsers();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: (userId: number) => usersService.delete(userId),
    async onSuccess(response) {
      invalidateUsers();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { deleteUser, isPending };
}
