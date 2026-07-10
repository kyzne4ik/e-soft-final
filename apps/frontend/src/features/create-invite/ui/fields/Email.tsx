import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateInviteFormData } from "../../model/types";

export function Email() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateInviteFormData>();

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
