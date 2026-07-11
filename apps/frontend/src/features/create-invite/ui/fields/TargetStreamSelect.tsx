import { useQuery } from "@tanstack/react-query";
import { Select } from "@repo/ui/atoms/select";
import { useFormContext, Controller } from "react-hook-form";
import { streamsQuery } from "@/entities/streams";
import type { CreateInviteFormData } from "../../model/types";

export function TargetStreamSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateInviteFormData>();

  const { data, isLoading } = useQuery(streamsQuery());
  const streams = data && !Array.isArray(data) ? data.data : [];

  const options = streams.map((stream) => ({
    value: String(stream.id),
    label: stream.name,
  }));

  return (
    <Controller
      name="targetStreamId"
      control={control}
      render={({ field }) => (
        <Select
          label="Поток"
          required
          placeholder={isLoading ? "Загрузка..." : "Выберите поток"}
          options={options}
          disabled={isLoading}
          state={errors.targetStreamId ? "error" : "default"}
          errorMessage={errors.targetStreamId?.message}
          {...field}
        />
      )}
    />
  );
}
