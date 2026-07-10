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
import type { InviteStorePayload } from "@repo/schemas";
import {
  FirstName,
  LastName,
  Patronymic,
  Email,
  RoleSelect,
  TtlSelect,
} from "./fields";
import { createInviteSchema, type CreateInviteFormData } from "../model/types";
import { useCreateInvite } from "../model/useCreateInvite";
import css from "./CreateInviteForm.module.css";

const FORM_ID = "create-invite-form";

export function CreateInviteForm({
  onSuccess,
  children,
}: {
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<CreateInviteFormData>({
    resolver: zodResolver(createInviteSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      patronymic: "",
      email: "",
      role: "",
      ttlSeconds: "86400",
    },
  });

  const { createInviteAsync } = useCreateInvite({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({ type: "success", message: "Приглашение отправлено" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при отправке приглашения",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateInviteFormData> = async (data) => {
    await createInviteAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic || null,
      email: data.email,
      role: data.role as InviteStorePayload["role"],
      ttlSeconds: Number(data.ttlSeconds),
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

CreateInviteForm.Fields = function CreateInviteFormFields() {
  return (
    <>
      <RoleSelect />
      <FirstName />
      <LastName />
      <Patronymic />
      <Email />
      <TtlSelect />
    </>
  );
};

CreateInviteForm.SubmitButton = function CreateInviteFormSubmitButton() {
  const { trigger, formState } = useFormContext<CreateInviteFormData>();
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
      Отправить инвайт
    </Button>
  );
};
