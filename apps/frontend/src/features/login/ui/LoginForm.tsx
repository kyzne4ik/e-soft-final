import type { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { Email, Password } from "./fields";
import { useLogin } from "../model/useLogin";
import { loginSchema, type LoginFormData } from "../model/types";
import css from "./LoginForm.module.css";
import { useNavigate } from "react-router";

export interface LoginFormProps {
  children: ReactNode;
}

export function LoginForm({ children }: LoginFormProps) {
  const navigate = useNavigate();
  const { getToast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginAsync } = useLogin({
    async onSuccess() {
      await getToast({
        type: "success",
        message: "Вход выполнен успешно",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при входе",
      });
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginAsync(data);
    navigate("/");
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={css.form}>
        {children}
      </form>
    </FormProvider>
  );
}

LoginForm.Fields = function LoginFormFields() {
  return (
    <>
      <Email />
      <Password />
    </>
  );
};

LoginForm.SubmitButton = function LoginFormSubmitButton() {
  const { trigger, formState } = useFormContext<LoginFormData>();

  const handleClick = async () => {
    const isValid = await trigger();
    if (!isValid) {
      console.warn("Form validation failed");
    }
  };

  return (
    <Button
      type="submit"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      fullWidth
      onClick={handleClick}
    >
      Войти
    </Button>
  );
};
