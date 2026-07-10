import { Input } from "@repo/ui/atoms/input";
import type { ActivateFormData } from "../../model/types";
import { useFormContext, Controller } from "react-hook-form";

export function Patronymic() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ActivateFormData>();

  return (
    <Controller
      name="patronymic"
      control={control}
      render={({ field }) => (
        <Input
          label="Отчество (опционально)"
          type="text"
          placeholder="Ваше отчество"
          fullWidth
          state={errors.patronymic ? "error" : "default"}
          errorMessage={errors.patronymic?.message}
          {...field}
          value={field.value ?? ""}
        />
      )}
    />
  );
}
