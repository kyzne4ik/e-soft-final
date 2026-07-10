import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { BindTelegramFormData } from "../../model/types";

export function TgUsername() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BindTelegramFormData>();

  return (
    <Controller
      name="tgUsername"
      control={control}
      render={({ field }) => (
        <Input
          label="Username"
          required
          type="text"
          placeholder="@username"
          fullWidth
          state={errors.tgUsername ? "error" : "default"}
          errorMessage={errors.tgUsername?.message}
          {...field}
        />
      )}
    />
  );
}
