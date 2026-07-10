import { Input } from "@repo/ui/atoms/input";
import type { UpdateUserFormData } from "../../model/types";
import { useFormContext, Controller } from "react-hook-form";

export function FirstName() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateUserFormData>();

  return (
    <Controller
      name="firstName"
      control={control}
      render={({ field }) => (
        <Input
          label="Имя"
          required
          type="text"
          placeholder="Иван"
          fullWidth
          state={errors.firstName ? "error" : "default"}
          errorMessage={errors.firstName?.message}
          {...field}
        />
      )}
    />
  );
}
