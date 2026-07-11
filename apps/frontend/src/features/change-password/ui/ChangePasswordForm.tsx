import type { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { OldPassword, NewPassword, ConfirmPassword } from "./fields";
import { useChangePassword } from "../model/useChangePassword";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../model/types";
import css from "./ChangePasswordForm.module.css";

export interface ChangePasswordFormProps {
  children: ReactNode;
}

export function ChangePasswordForm({ children }: ChangePasswordFormProps) {
  const { getToast } = useToast();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { changePassword } = useChangePassword({
    async onSuccess() {
      form.reset();
      await getToast({
        type: "success",
        message: "Пароль успешно изменён",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при смене пароля",
      });
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    const { oldPassword, newPassword } = data;
    changePassword({ oldPassword, newPassword });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={css.form}>
        {children}
      </form>
    </FormProvider>
  );
}

ChangePasswordForm.Fields = function ChangePasswordFormFields() {
  return (
    <>
      <OldPassword />
      <NewPassword />
      <ConfirmPassword />
    </>
  );
};

ChangePasswordForm.SubmitButton = function ChangePasswordFormSubmitButton() {
  const { trigger, formState } = useFormContext<ChangePasswordFormData>();

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
      Изменить пароль
    </Button>
  );
};
