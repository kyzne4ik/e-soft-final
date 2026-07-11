import { useQuery } from "@tanstack/react-query";
import { Select } from "@repo/ui/atoms/select";
import { useFormContext, Controller } from "react-hook-form";
import { streamsQuery } from "@/entities/streams";
import type { UpdateLessonFormData } from "../../model/types";

export function StreamSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateLessonFormData>();

  const { data, isLoading } = useQuery(streamsQuery());
  const streams = data && !Array.isArray(data) ? data.data : [];

  const options = streams.map((stream) => ({
    value: String(stream.id),
    label: stream.name,
  }));

  return (
    <Controller
      name="streamId"
      control={control}
      render={({ field }) => (
        <Select
          label="Поток"
          required
          placeholder={isLoading ? "Загрузка..." : "Выберите поток"}
          options={options}
          disabled={isLoading}
          state={errors.streamId ? "error" : "default"}
          errorMessage={errors.streamId?.message}
          {...field}
        />
      )}
    />
  );
}
