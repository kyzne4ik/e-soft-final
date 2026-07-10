import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import type { ReactNode } from "react";
import css from "./UpdateUserForm.module.css";
import { Button } from "@repo/ui/atoms/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "../model/useUpdateUser";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import type { UserResponse, UpdateUserPayload } from "@repo/schemas";
import { updateUserSchema, type UpdateUserFormData } from "../model/types";
import { RoleSelect, FirstName, LastName, Patronymic, Email } from "./fields";

const FORM_ID = "update-user-form";

export interface UpdateUserFormProps {
  user: UserResponse;
  onSuccess?: () => void;
  children: ReactNode;
}

export function UpdateUserForm({
  user,
  onSuccess,
  children,
}: UpdateUserFormProps) {
  const { getToast } = useToast();

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic ?? "",
      email: user.email,
      role: user.role,
    },
  });

  const { updateUserAsync } = useUpdateUser(user.id, {
    async onSuccess() {
      onSuccess?.();
      await getToast({ type: "success", message: "Пользователь обновлён" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при обновлении пользователя",
      });
    },
  });

  const onSubmit: SubmitHandler<UpdateUserFormData> = async (data) => {
    await updateUserAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic || null,
      email: data.email,
      role: data.role as UpdateUserPayload["role"],
    });
  };

  return (
    <FormProvider {...form}>
      <form
        id={FORM_ID}
        onSubmit={form.handleSubmit(onSubmit)}
        className={css.form}
      >
        {children}
      </form>
    </FormProvider>
  );
}

UpdateUserForm.Fields = function UpdateUserFormFields() {
  return (
    <>
      <RoleSelect />
      <FirstName />
      <LastName />
      <Patronymic />
      <Email />
    </>
  );
};

UpdateUserForm.SubmitButton = function UpdateUserFormSubmitButton() {
  const { trigger, formState } = useFormContext<UpdateUserFormData>();
  const { getToast } = useToast();

  const handleClick = async () => {
    const isValid = await trigger();
    if (!isValid) {
      await getToast({
        type: "info",
        message: "Пожалуйста, заполните обязательные поля",
      });
    }
  };

  return (
    <Button
      type="submit"
      form={FORM_ID}
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      fullWidth
      onClick={handleClick}
    >
      Сохранить изменения
    </Button>
  );
};
