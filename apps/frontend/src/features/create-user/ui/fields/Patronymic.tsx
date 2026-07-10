import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateUserFormData } from "../../model/types";

export function Patronymic() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserFormData>();

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
