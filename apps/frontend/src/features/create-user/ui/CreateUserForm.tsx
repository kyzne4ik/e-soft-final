import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import type { CreateUserPayload } from "@repo/schemas";
import {
  FirstName,
  LastName,
  Patronymic,
  Email,
  Password,
  RoleSelect,
} from "./fields";
import { createUserSchema, type CreateUserFormData } from "../model/types";
import { useCreateUser } from "../model/useCreateUser";
import css from "./CreateUserForm.module.css";

const FORM_ID = "create-user-form";

export interface CreateUserFormProps {
  onSuccess?: () => void;
  children: ReactNode;
}

export function CreateUserForm({ onSuccess, children }: CreateUserFormProps) {
  const { getToast } = useToast();

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      patronymic: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const { createUserAsync } = useCreateUser({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({ type: "success", message: "Пользователь создан" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при создании пользователя",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUserAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic || null,
      email: data.email,
      password: data.password,
      role: data.role as CreateUserPayload["role"],
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

CreateUserForm.Fields = function CreateUserFormFields() {
  return (
    <>
      <RoleSelect />
      <FirstName />
      <LastName />
      <Patronymic />
      <Email />
      <Password />
    </>
  );
};

CreateUserForm.SubmitButton = function CreateUserFormSubmitButton() {
  const { trigger, formState } = useFormContext<CreateUserFormData>();
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
      Создать пользователя
    </Button>
  );
};
