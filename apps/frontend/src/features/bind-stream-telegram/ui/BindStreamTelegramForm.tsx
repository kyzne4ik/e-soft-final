import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import { HelpTip } from "@repo/ui/molecules/help-tip";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useBindStreamTelegram } from "../model/useBindStreamTelegram";
import {
  bindStreamTelegramSchema,
  type BindStreamTelegramFormData,
} from "../model/types";
import { ChatId, AnnounceThreadId } from "./fields";
import css from "./BindStreamTelegramForm.module.css";

const FORM_ID = "bind-stream-telegram-form";

const HELP_STEPS = [
  {
    text: (
      <>
        Добавьте бота в ваш Telegram-канал или группу как{" "}
        <code>администратора</code>
      </>
    ),
  },
  {
    text: (
      <>
        Перейдите в нужный топик и отправьте команду <code>/topic_id</code>
      </>
    ),
  },
  {
    text: (
      <>
        Бот вернёт <code>chat_id</code> и <code>thread_id</code> — скопируйте их
        в поля ниже
      </>
    ),
  },
];

export function BindStreamTelegramForm({
  streamId,
  onSuccess,
  children,
}: {
  streamId: number;
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<BindStreamTelegramFormData>({
    resolver: zodResolver(bindStreamTelegramSchema),
    mode: "onBlur",
    defaultValues: {
      chatId: "",
      announceThreadId: "",
    },
  });

  const { bindStreamTelegramAsync } = useBindStreamTelegram({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({ type: "success", message: "Telegram-канал привязан" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при привязке канала",
      });
    },
  });

  const onSubmit: SubmitHandler<BindStreamTelegramFormData> = async (data) => {
    await bindStreamTelegramAsync({
      streamId,
      chatId: data.chatId,
      announceThreadId: data.announceThreadId
        ? Number(data.announceThreadId)
        : null,
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

BindStreamTelegramForm.Fields = function BindStreamTelegramFormFields() {
  return (
    <>
      <div className={css.fields_header}>
        <span className={css.fields_label}>Идентификаторы</span>
        <HelpTip
          title="Как получить идентификаторы"
          steps={HELP_STEPS}
          position="right"
        />
      </div>
      <ChatId />
      <AnnounceThreadId />
    </>
  );
};

BindStreamTelegramForm.SubmitButton =
  function BindStreamTelegramFormSubmitButton() {
    const { trigger, formState } = useFormContext<BindStreamTelegramFormData>();
    const { getToast } = useToast();

    const handleClick = async () => {
      const isValid = await trigger();
      if (!isValid) {
        await getToast({
          type: "info",
          message: "Пожалуйста, укажите ID чата/канала",
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
        Привязать канал
      </Button>
    );
  };
