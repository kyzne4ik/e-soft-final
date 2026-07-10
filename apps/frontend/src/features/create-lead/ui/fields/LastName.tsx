import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateLeadFormData } from "../../model/types";

export function LastName() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateLeadFormData>();

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
