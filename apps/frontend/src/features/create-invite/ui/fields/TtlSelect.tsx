import { Select } from "@repo/ui/atoms/select";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateInviteFormData } from "../../model/types";

const TTL_OPTIONS = [
  { value: "86400", label: "1 день" },
  { value: "259200", label: "3 дня" },
  { value: "604800", label: "7 дней" },
];

export function TtlSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateInviteFormData>();

  return (
    <Controller
      name="ttlSeconds"
      control={control}
      render={({ field }) => (
        <Select
          label="Срок действия ссылки"
          required
          placeholder="Выберите срок"
          options={TTL_OPTIONS}
          state={errors.ttlSeconds ? "error" : "default"}
          errorMessage={errors.ttlSeconds?.message}
          {...field}
        />
      )}
    />
  );
}
