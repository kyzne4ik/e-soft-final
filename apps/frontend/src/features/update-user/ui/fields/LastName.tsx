import { Input } from "@repo/ui/atoms/input";
import type { UpdateUserFormData } from "../../model/types";
import { useFormContext, Controller } from "react-hook-form";

export function LastName() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateUserFormData>();

  return (
    <Controller
      name="lastName"
      control={control}
      render={({ field }) => (
        <Input
          label="Фамилия"
          required
          type="text"
          placeholder="Иванов"
          fullWidth
          state={errors.lastName ? "error" : "default"}
          errorMessage={errors.lastName?.message}
          {...field}
        />
      )}
    />
  );
}
