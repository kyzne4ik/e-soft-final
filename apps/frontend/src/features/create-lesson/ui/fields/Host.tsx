import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateLessonFormData } from "../../model/types";

export function Host() {
  const { control } = useFormContext<CreateLessonFormData>();

  return (
    <Controller
      name="host"
      control={control}
      render={({ field }) => (
        <Input
          label="Ведёт"
          type="text"
          placeholder="Имя ведущего"
          fullWidth
          {...field}
        />
      )}
    />
  );
}
