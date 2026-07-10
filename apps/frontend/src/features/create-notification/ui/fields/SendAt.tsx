import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateNotificationFormData } from "../../model/types";

export function SendAt() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateNotificationFormData>();

  return (
    <Controller
      name="sendAt"
      control={control}
      render={({ field }) => (
        <Input
          label="Отправить в (необязательно)"
          type="datetime-local"
          fullWidth
          state={errors.sendAt ? "error" : "default"}
          errorMessage={errors.sendAt?.message}
          {...field}
        />
      )}
    />
  );
}
