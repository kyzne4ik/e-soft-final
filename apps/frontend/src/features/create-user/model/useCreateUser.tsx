import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { CreateUserPayload } from "@repo/schemas";
import { usersService } from "@/shared/api";
import { useInvalidateUsers } from "@/entities/user/queries";

export function useCreateUser({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateUsers = useInvalidateUsers();

  const { mutateAsync: createUserAsync, isPending } = useMutation({
    mutationFn: (payload: CreateUserPayload) => usersService.create(payload),
    async onSuccess(response) {
      invalidateUsers();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { createUserAsync, isPending };
}
