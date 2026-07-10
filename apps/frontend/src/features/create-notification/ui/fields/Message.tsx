import { TextArea } from "@repo/ui/atoms/textarea";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateNotificationFormData } from "../../model/types";

export function Message() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateNotificationFormData>();

  return (
    <Controller
      name="message"
      control={control}
      render={({ field }) => (
        <TextArea
          label="Сообщение"
          required
          placeholder="Текст уведомления"
          fullWidth
          rows={4}
          state={errors.message ? "error" : "default"}
          errorMessage={errors.message?.message}
          {...field}
        />
      )}
    />
  );
}
