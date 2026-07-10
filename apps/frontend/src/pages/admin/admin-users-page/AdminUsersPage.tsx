import { useState, type ChangeEvent } from "react";
import type { Role } from "@repo/schemas";
import { Flex } from "@repo/ui/layouts/flex";
import { Select } from "@repo/ui/atoms/select";
import { AdminUsersTable } from "@/widgets/admin-users-table";
import { CreateUserButton } from "@/features/create-user";
import { CreateInviteButton } from "@/features/create-invite";
import css from "./AdminUsersPage.module.css";

const ROLE_OPTIONS = [
  { label: "Все роли", value: "" },
  { label: "Студент", value: "STUDENT" },
  { label: "Ментор", value: "MENTOR" },
  { label: "Менеджер", value: "MANAGER" },
  { label: "Админ", value: "ADMIN" },
];

export default function AdminUsersPage() {
  const [role, setRole] = useState<Role | "">("");

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value as Role | "");
  };

  return (
    <div className={css.root}>
      <Flex justify="end" gap="2" max>
        <Select
          aria-label="Фильтр по роли"
          value={role}
          options={ROLE_OPTIONS}
          onChange={handleRoleChange}
        />
        <CreateInviteButton />
        <CreateUserButton />
      </Flex>
      <div className={css.page}>
        <AdminUsersTable query={role ? { role } : undefined} />
      </div>
    </div>
  );
}
