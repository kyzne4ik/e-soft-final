import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { BindStreamTelegramFormData } from "../../model/types";

export function AnnounceThreadId() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BindStreamTelegramFormData>();

  return (
    <Controller
      name="announceThreadId"
      control={control}
      render={({ field }) => (
        <Input
          label="ID треда для анонсов"
          required
          type="number"
          placeholder="Например, 42"
          fullWidth
          state={errors.announceThreadId ? "error" : "default"}
          errorMessage={errors.announceThreadId?.message}
          {...field}
        />
      )}
    />
  );
}
