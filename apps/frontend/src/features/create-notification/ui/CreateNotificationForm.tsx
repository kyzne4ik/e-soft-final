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
import { RecipientSelect, Message, SendAt, IsSilent } from "./fields";
import {
  createNotificationSchema,
  type CreateNotificationFormData,
} from "../model/types";
import { useCreateNotification } from "../model/useCreateNotification";
import css from "./CreateNotificationForm.module.css";

const FORM_ID = "create-notification-form";

export function CreateNotificationForm({
  children,
  onSuccess,
  defaultUserId,
}: {
  children: ReactNode;
  onSuccess?: () => void;
  defaultUserId?: string;
}) {
  const { getToast } = useToast();

  const form = useForm<CreateNotificationFormData>({
    resolver: zodResolver(createNotificationSchema),
    mode: "onBlur",
    defaultValues: {
      userId: defaultUserId ?? "",
      message: "",
      sendAt: "",
      isSilent: false,
    },
  });

  const { createNotificationAsync } = useCreateNotification({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({ type: "success", message: "Уведомление создано" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при создании уведомления",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateNotificationFormData> = async (data) => {
    await createNotificationAsync({
      userId: Number(data.userId),
      message: data.message,
      isSilent: data.isSilent,
      sendAt: data.sendAt ? new Date(data.sendAt) : null,
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

CreateNotificationForm.Fields = function CreateNotificationFormFields({
  hideRecipient = false,
}: {
  hideRecipient?: boolean;
}) {
  return (
    <>
      {!hideRecipient && <RecipientSelect />}
      <Message />
      <SendAt />
      <IsSilent />
    </>
  );
};

CreateNotificationForm.SubmitButton =
  function CreateNotificationFormSubmitButton() {
    const { trigger, formState } = useFormContext<CreateNotificationFormData>();
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
        Отправить уведомление
      </Button>
    );
  };
