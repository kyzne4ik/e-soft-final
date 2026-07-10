import { Flex } from "@repo/ui/layouts/flex";
import { VStack } from "@repo/ui/layouts/v-stack";
import { LoginForm } from "@/features/login";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <Flex justify="center" align="center" className={css.page}>
      <VStack gap="5" max className={css.card}>
        <VStack gap="2" align="center" max className={css.head}>
          <span className={css.brand}>ESOFT Learn</span>
          <h1 className={css.title}>Добро пожаловать!</h1>
          <p className={css.subtitle}>Введите данные, чтобы войти в аккаунт.</p>
        </VStack>

        <div className={css.formSlot}>
          <LoginForm>
            <LoginForm.Fields />
            <LoginForm.SubmitButton />
          </LoginForm>
        </div>
      </VStack>
    </Flex>
  );
}
