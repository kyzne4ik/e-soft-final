import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpsertSubmissionFormData } from "../../model/types";

export function RepoLink() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpsertSubmissionFormData>();

  return (
    <Controller
      name="repoLink"
      control={control}
      render={({ field }) => (
        <Input
          label="Ссылка на Pull Request"
          required
          type="url"
          placeholder="https://github.com/username/repo/pull/1"
          fullWidth
          state={errors.repoLink ? "error" : "default"}
          errorMessage={errors.repoLink?.message}
          {...field}
        />
      )}
    />
  );
}
