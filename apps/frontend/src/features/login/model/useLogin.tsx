import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from "@/shared/consts";
import { authService } from "@/shared/api";
import type { LoginPayload } from "@repo/schemas";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useInvalidateAuth } from "@/entities/auth";
import type { AxiosError, AxiosResponse } from "axios";

export function useLogin({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateAuth = useInvalidateAuth();

  const {
    mutate: login,
    mutateAsync: loginAsync,
    isPending,
  } = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    async onSuccess(response) {
      const { data } = response.data;
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, data.refreshToken);

      await invalidateAuth();

      onSuccess?.(response);
    },
    retry: false,
    onError,
    onSettled,
  });

  return { login, loginAsync, isPending };
}
