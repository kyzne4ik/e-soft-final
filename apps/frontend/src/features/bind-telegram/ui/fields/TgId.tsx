import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { BindTelegramFormData } from "../../model/types";

export function TgId() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BindTelegramFormData>();

  return (
    <Controller
      name="tgId"
      control={control}
      render={({ field }) => (
        <Input
          label="Telegram ID"
          required
          type="text"
          placeholder="123456789"
          fullWidth
          state={errors.tgId ? "error" : "default"}
          errorMessage={errors.tgId?.message}
          {...field}
        />
      )}
    />
  );
}
