import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { ActivateFormData } from "../../model/types";

export function FirstName() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ActivateFormData>();

  return (
    <Controller
      name="firstName"
      control={control}
      render={({ field }) => (
        <Input
          label="Имя"
          required
          type="text"
          placeholder="Ваше имя"
          fullWidth
          state={errors.firstName ? "error" : "default"}
          errorMessage={errors.firstName?.message}
          {...field}
        />
      )}
    />
  );
}
