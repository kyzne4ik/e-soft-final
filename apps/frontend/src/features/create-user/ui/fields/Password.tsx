import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateUserFormData } from "../../model/types";

export function Password() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserFormData>();

  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <Input
          label="Пароль"
          required
          type="password"
          placeholder="••••••••"
          fullWidth
          state={errors.password ? "error" : "default"}
          errorMessage={errors.password?.message}
          {...field}
        />
      )}
    />
  );
}
