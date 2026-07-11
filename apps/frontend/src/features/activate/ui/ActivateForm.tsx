import type { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { FirstName, LastName, Patronymic, Password } from "./fields";
import { useActivate } from "../model/useActivate";
import { activateSchema, type ActivateFormData } from "../model/types";
import css from "./ActivateForm.module.css";

export interface ActivateFormProps {
  token: string;
  children: ReactNode;
}

export function ActivateForm({ token, children }: ActivateFormProps) {
  const { getToast } = useToast();

  const form = useForm<ActivateFormData>({
    resolver: zodResolver(activateSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      patronymic: "",
      password: "",
    },
  });

  const { activateAsync } = useActivate(token, {
    async onSuccess() {
      await getToast({
        type: "success",
        message: "Аккаунт успешно активирован",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при активации аккаунта",
      });
    },
  });

  const onSubmit = async (data: ActivateFormData) => {
    await activateAsync(data).catch(() => {});
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={css.form}>
        {children}
      </form>
    </FormProvider>
  );
}

ActivateForm.Fields = function ActivateFormFields() {
  return (
    <>
      <FirstName />
      <LastName />
      <Patronymic />
      <Password />
    </>
  );
};

ActivateForm.SubmitButton = function ActivateFormSubmitButton() {
  const { trigger, formState } = useFormContext<ActivateFormData>();

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
      Завершить активацию
    </Button>
  );
};
