import { authService } from "@/shared/api";
import type { ActivateFormData } from "./types";
import type { ApiErrorResponse } from "@/shared/lib/types";
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from "@/shared/consts";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useInvalidateAuth } from "@/entities/auth/queries";

export function useActivate(
  token: string,
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
  const invalidateAuth = useInvalidateAuth();

  const {
    mutate: activate,
    mutateAsync: activateAsync,
    isPending,
  } = useMutation({
    mutationFn: (payload: ActivateFormData) =>
      authService.activate({
        token,
        ...payload,
      }),
    async onSuccess(response) {
      const { data } = response.data;
      if (data.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, data.accessToken);
        localStorage.setItem(
          REFRESH_TOKEN_LOCAL_STORAGE_KEY,
          data.refreshToken,
        );
        invalidateAuth();
      }
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { activate, activateAsync, isPending };
}
