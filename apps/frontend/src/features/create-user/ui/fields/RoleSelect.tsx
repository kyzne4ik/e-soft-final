import { Select } from "@repo/ui/atoms/select";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateUserFormData } from "../../model/types";

const ROLE_OPTIONS = [
  { value: "ADMIN", label: "Администратор" },
  { value: "MANAGER", label: "Менеджер" },
  { value: "MENTOR", label: "Ментор" },
  { value: "STUDENT", label: "Студент" },
];

export function RoleSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserFormData>();

  return (
    <Controller
      name="role"
      control={control}
      render={({ field }) => (
        <Select
          label="Роль"
          required
          placeholder="Выберите роль"
          options={ROLE_OPTIONS}
          state={errors.role ? "error" : "default"}
          errorMessage={errors.role?.message}
          {...field}
        />
      )}
    />
  );
}
