import { TextArea } from "@repo/ui/atoms/textarea";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateLessonFormData } from "../../model/types";

export function Description() {
  const { control } = useFormContext<UpdateLessonFormData>();

  return (
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <TextArea
          label="Описание"
          placeholder="Краткое описание темы занятия"
          rows={3}
          fullWidth
          {...field}
        />
      )}
    />
  );
}
