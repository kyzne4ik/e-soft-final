import { Input } from "@repo/ui/atoms/input";
import type { UpdateUserFormData } from "../../model/types";
import { useFormContext, Controller } from "react-hook-form";

export function Email() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateUserFormData>();

  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <Input
          label="Email"
          required
          type="email"
          placeholder="example@mail.com"
          fullWidth
          state={errors.email ? "error" : "default"}
          errorMessage={errors.email?.message}
          {...field}
        />
      )}
    />
  );
}
