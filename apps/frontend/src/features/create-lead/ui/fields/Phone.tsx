import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateLeadFormData } from "../../model/types";

export function Phone() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateLeadFormData>();

  return (
    <Controller
      name="phone"
      control={control}
      render={({ field }) => (
        <Input
          label="Телефон"
          type="tel"
          placeholder="+7 900 000-00-00"
          fullWidth
          state={errors.phone ? "error" : "default"}
          errorMessage={errors.phone?.message}
          {...field}
        />
      )}
    />
  );
}
