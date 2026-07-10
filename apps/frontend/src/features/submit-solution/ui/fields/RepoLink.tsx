import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { SubmitSolutionFormData } from "../../model/types";

export function RepoLink() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SubmitSolutionFormData>();

  return (
    <Controller
      name="repoLink"
      control={control}
      render={({ field }) => (
        <Input
          label="Ссылка на репозиторий"
          required
          type="url"
          placeholder="https://github.com/username/homework"
          fullWidth
          state={errors.repoLink ? "error" : "default"}
          errorMessage={errors.repoLink?.message}
          {...field}
        />
      )}
    />
  );
}
