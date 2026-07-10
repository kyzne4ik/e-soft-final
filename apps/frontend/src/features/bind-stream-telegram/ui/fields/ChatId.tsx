import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { BindStreamTelegramFormData } from "../../model/types";

export function ChatId() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BindStreamTelegramFormData>();

  return (
    <Controller
      name="chatId"
      control={control}
      render={({ field }) => (
        <Input
          label="ID чата / канала"
          required
          type="text"
          placeholder="-1001234567890"
          fullWidth
          state={errors.chatId ? "error" : "default"}
          errorMessage={errors.chatId?.message}
          {...field}
        />
      )}
    />
  );
}
