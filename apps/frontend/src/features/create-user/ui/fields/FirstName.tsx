import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateUserFormData } from "../../model/types";

export function FirstName() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserFormData>();

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
