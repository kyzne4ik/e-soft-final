import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateCourseFormData } from "../../model/types";

export function Name() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateCourseFormData>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <Input
          label="Название курса"
          required
          type="text"
          placeholder="Напр. React Advanced"
          fullWidth
          state={errors.name ? "error" : "default"}
          errorMessage={errors.name?.message}
          {...field}
        />
      )}
    />
  );
}
