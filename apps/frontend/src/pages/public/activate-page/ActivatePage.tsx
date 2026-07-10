import { Navigate, useSearchParams } from "react-router";
import { Flex } from "@repo/ui/layouts/flex";
import { VStack } from "@repo/ui/layouts/v-stack";
import { ActivateForm } from "@/features/activate";
import { useAuth } from "@/features/auth";
import css from "./ActivatePage.module.css";

export default function ActivatePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuth) {
    return <Navigate replace to="/" />;
  }

  if (!token) {
    return <Navigate replace to="/login" />;
  }

  return (
    <Flex justify="center" align="center" className={css.page}>
      <VStack gap="5" max className={css.card}>
        <VStack gap="2" align="center" max className={css.head}>
          <span className={css.brand}>ESOFT Learn</span>
          <h1 className={css.title}>Активация аккаунта</h1>
          <p className={css.subtitle}>
            Заполните данные, чтобы завершить регистрацию.
          </p>
        </VStack>

        <div className={css.formSlot}>
          <ActivateForm token={token}>
            <ActivateForm.Fields />
            <ActivateForm.SubmitButton />
          </ActivateForm>
        </div>
      </VStack>
    </Flex>
  );
}
