import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router";
import { Flex } from "@repo/ui/layouts/flex";
import { VStack } from "@repo/ui/layouts/v-stack";
import { Spinner } from "@repo/ui/atoms/spinner";
import { authService } from "@/shared/api";
import { useInvalidateAuth } from "@/entities/auth/queries";
import { useAuth } from "@/features/auth";
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from "@/shared/consts";
import css from "./ConfirmEnrollmentPage.module.css";

export default function ConfirmEnrollmentPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { isAuth, isLoading: isAuthLoading } = useAuth();
  const invalidateAuth = useInvalidateAuth();

  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!token) return;

    authService
      .confirmEnrollment(token)
      .then((res) => {
        const { accessToken, refreshToken } = res.data.data;
        localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, refreshToken);
        invalidateAuth();
        setStatus("success");
      })
      .catch((err) => {
        setErrorMessage(
          err?.response?.data?.message || "Ссылка недействительна или истекла.",
        );
        setStatus("error");
      });
  }, []);

  if (isAuthLoading) return null;

  if (status === "success" || isAuth) {
    return <Navigate replace to="/" />;
  }

  if (!token) {
    return <Navigate replace to="/login" />;
  }

  return (
    <Flex justify="center" align="center" className={css.page}>
      <VStack gap="4" align="center" max className={css.card}>
        <span className={css.brand}>ESOFT Learn</span>

        {status === "pending" && (
          <>
            <Spinner size={36} />
            <p className={css.subtitle}>Подтверждаем участие…</p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className={css.title}>Ссылка недействительна</h1>
            <p className={css.subtitle}>{errorMessage}</p>
            <a className={css.link} href="/login">
              Войти в аккаунт →
            </a>
          </>
        )}
      </VStack>
    </Flex>
  );
}
