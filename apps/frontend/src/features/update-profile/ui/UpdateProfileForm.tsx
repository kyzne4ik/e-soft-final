import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "../model/types";
import type { ReactNode } from "react";
import { useAuth } from "@/features/auth";
import { Button } from "@repo/ui/atoms/button";
import css from "./UpdateProfileForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfile } from "../model/useUpdateProfile";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { FirstName, LastName, Patronymic, Email } from "./fields";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export function UpdateProfileForm({ children }: { children: ReactNode }) {
  const { data } = useAuth();
  const { getToast } = useToast();

  const user = data?.data;

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      patronymic: user?.patronymic ?? "",
      email: user?.email,
    },
  });

  const { updateProfile } = useUpdateProfile({
    async onSuccess() {
      await getToast({
        type: "success",
        message: "Профиль обновлён",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при обновлении профиля",
      });
    },
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic?.trim() ? data.patronymic : null,
      email: data.email,
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={css.form}>
        {children}
      </form>
    </FormProvider>
  );
}

UpdateProfileForm.Fields = function UpdateProfileFormFields() {
  return (
    <>
      <FirstName />
      <LastName />
      <Patronymic />
      <Email />
    </>
  );
};

UpdateProfileForm.SubmitButton = function UpdateProfileFormSubmitButton() {
  const { formState } = useFormContext<UpdateProfileFormData>();

  return (
    <Button
      type="submit"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      fullWidth
    >
      Сохранить
    </Button>
  );
};
