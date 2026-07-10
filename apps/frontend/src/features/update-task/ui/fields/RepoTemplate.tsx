import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateTaskFormData } from "../../model/types";

export function RepoTemplate() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateTaskFormData>();

  return (
    <Controller
      name="repoTemplate"
      control={control}
      render={({ field }) => (
        <Input
          label="Шаблон репозитория"
          required
          type="text"
          placeholder="https://github.com/org/template"
          fullWidth
          state={errors.repoTemplate ? "error" : "default"}
          errorMessage={errors.repoTemplate?.message}
          {...field}
        />
      )}
    />
  );
}
