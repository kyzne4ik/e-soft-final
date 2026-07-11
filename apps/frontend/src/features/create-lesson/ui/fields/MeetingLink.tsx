import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateLessonFormData } from "../../model/types";

export function MeetingLink() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateLessonFormData>();

  return (
    <Controller
      name="meetingLink"
      control={control}
      render={({ field }) => (
        <Input
          label="Ссылка на трансляцию"
          type="url"
          placeholder="https://zoom.us/..."
          fullWidth
          state={errors.meetingLink ? "error" : "default"}
          errorMessage={errors.meetingLink?.message}
          {...field}
        />
      )}
    />
  );
}
