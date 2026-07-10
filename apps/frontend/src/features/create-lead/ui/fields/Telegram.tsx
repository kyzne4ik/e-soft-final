import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateLeadFormData } from "../../model/types";

export function Telegram() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateLeadFormData>();

  return (
    <Controller
      name="telegram"
      control={control}
      render={({ field }) => (
        <Input
          label="Telegram"
          type="text"
          placeholder="@username"
          fullWidth
          state={errors.telegram ? "error" : "default"}
          errorMessage={errors.telegram?.message}
          {...field}
        />
      )}
    />
  );
}
