import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateLeadFormData } from "../../model/types";

export function TestResult() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateLeadFormData>();

  return (
    <Controller
      name="testResult"
      control={control}
      render={({ field }) => (
        <Input
          label="Результат теста"
          type="url"
          placeholder="https://forms.gle/..."
          fullWidth
          state={errors.testResult ? "error" : "default"}
          errorMessage={errors.testResult?.message}
          {...field}
        />
      )}
    />
  );
}
