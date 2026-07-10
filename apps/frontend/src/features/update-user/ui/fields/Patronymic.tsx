import { Input } from "@repo/ui/atoms/input";
import type { UpdateUserFormData } from "../../model/types";
import { useFormContext, Controller } from "react-hook-form";

export function Patronymic() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateUserFormData>();

  return (
    <Controller
      name="patronymic"
      control={control}
      render={({ field }) => (
        <Input
          label="Отчество"
          type="text"
          placeholder="Иванович"
          fullWidth
          state={errors.patronymic ? "error" : "default"}
          errorMessage={errors.patronymic?.message}
          {...field}
        />
      )}
    />
  );
}
