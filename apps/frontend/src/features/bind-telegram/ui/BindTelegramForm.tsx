import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { TgId, TgUsername } from "./fields";
import { useBindTelegram } from "../model/useBindTelegram";
import { bindTelegramSchema, type BindTelegramFormData } from "../model/types";
import css from "./BindTelegramForm.module.css";

export interface BindTelegramFormProps {
  onSuccess?: () => void;
}

export function BindTelegramForm({ onSuccess }: BindTelegramFormProps) {
  const { getToast } = useToast();

  const form = useForm<BindTelegramFormData>({
    resolver: zodResolver(bindTelegramSchema),
    mode: "onBlur",
    defaultValues: {
      tgId: "",
      tgUsername: "",
    },
  });

  const { bindTelegram, isPending } = useBindTelegram({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({ type: "success", message: "Telegram привязан" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при привязке Telegram",
      });
    },
  });

  const onSubmit = (data: BindTelegramFormData) => {
    bindTelegram({ tgId: data.tgId, tgUsername: data.tgUsername });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={css.form}>
        <TgId />
        <TgUsername />
        <Button
          type="submit"
          isPending={isPending}
          isDisabled={isPending}
          fullWidth
        >
          Привязать Telegram
        </Button>
      </form>
    </FormProvider>
  );
}
