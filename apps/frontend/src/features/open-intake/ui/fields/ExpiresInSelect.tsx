import { Select } from "@repo/ui/atoms/select";
import { useFormContext, Controller } from "react-hook-form";
import type { OpenIntakeFormData } from "../../model/types";

const EXPIRES_IN_OPTIONS = [
  { value: "3600", label: "1 час" },
  { value: "21600", label: "6 часов" },
  { value: "86400", label: "1 день" },
  { value: "259200", label: "3 дня" },
  { value: "604800", label: "1 неделя" },
];

export function ExpiresInSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<OpenIntakeFormData>();

  return (
    <Controller
      name="expiresIn"
      control={control}
      render={({ field }) => (
        <Select
          label="Срок действия токена"
          required
          placeholder="Выберите срок"
          options={EXPIRES_IN_OPTIONS}
          state={errors.expiresIn ? "error" : "default"}
          errorMessage={errors.expiresIn?.message}
          {...field}
        />
      )}
    />
  );
}
