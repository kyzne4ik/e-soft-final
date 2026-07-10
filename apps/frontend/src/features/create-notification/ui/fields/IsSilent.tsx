import { Checkbox } from "@repo/ui/atoms/checkbox";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateNotificationFormData } from "../../model/types";

export function IsSilent() {
  const { control } = useFormContext<CreateNotificationFormData>();

  return (
    <Controller
      name="isSilent"
      control={control}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          onChange={field.onChange}
          label="Тихое уведомление (без пуша)"
        />
      )}
    />
  );
}
