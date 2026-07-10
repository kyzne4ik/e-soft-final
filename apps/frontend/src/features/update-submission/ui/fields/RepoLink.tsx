import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateSubmissionFormData } from "../../model/types";

export function RepoLink() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateSubmissionFormData>();

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
