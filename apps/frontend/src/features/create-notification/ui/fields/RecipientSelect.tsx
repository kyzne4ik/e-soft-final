import { useQuery } from "@tanstack/react-query";
import { Select } from "@repo/ui/atoms/select";
import { useFormContext, Controller } from "react-hook-form";
import { usersQuery } from "@/entities/user";
import type { CreateNotificationFormData } from "../../model/types";

export function RecipientSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateNotificationFormData>();

  const { data, isLoading } = useQuery(usersQuery());
  const users = data?.data.data ?? [];

  const options = users.map((user) => ({
    value: String(user.id),
    label: `${user.lastName} ${user.firstName}`,
  }));

  return (
    <Controller
      name="userId"
      control={control}
      render={({ field }) => (
        <Select
          label="Получатель"
          required
          placeholder={isLoading ? "Загрузка..." : "Выберите пользователя"}
          options={options}
          disabled={isLoading}
          state={errors.userId ? "error" : "default"}
          errorMessage={errors.userId?.message}
          {...field}
        />
      )}
    />
  );
}
