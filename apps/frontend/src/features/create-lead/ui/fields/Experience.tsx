import { TextArea } from "@repo/ui/atoms/textarea";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateLeadFormData } from "../../model/types";

export function Experience() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateLeadFormData>();

  return (
    <Controller
      name="experience"
      control={control}
      render={({ field }) => (
        <TextArea
          label="Опыт"
          placeholder="Коротко об опыте кандидата"
          fullWidth
          rows={3}
          state={errors.experience ? "error" : "default"}
          errorMessage={errors.experience?.message}
          {...field}
        />
      )}
    />
  );
}
