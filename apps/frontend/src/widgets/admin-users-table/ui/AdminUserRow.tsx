import css from "./AdminUsersTable.module.css";
import { Avatar } from "@repo/ui/atoms/avatar";
import { Table } from "@repo/ui/organisms/table";
import type { UserResponse } from "@repo/schemas";
import { UpdateUserButton } from "@/features/update-user";
import { DeleteUserButton } from "@/features/delete-user";
import { ROLE_LABEL, initialsOf, avatarColorById } from "../model/formatters";

interface AdminUserRowProps {
  user: UserResponse;
}

export function AdminUserRow({ user }: AdminUserRowProps) {
  return (
    <Table.Row>
      <Table.Cell>
        <span className={css.user}>
          <Avatar
            person={{
              name: `${user.firstName} ${user.lastName}`,
              initials: initialsOf(user.firstName, user.lastName),
              color: avatarColorById(user.id),
            }}
            size={36}
          />
          <span className={css.name}>
            {user.firstName} {user.lastName}
          </span>
        </span>
      </Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>
        <span className={css.role}>{ROLE_LABEL[user.role]}</span>
      </Table.Cell>
      <Table.Cell align="right">
        <span className={css.actions}>
          <UpdateUserButton user={user} />
          <DeleteUserButton
            userId={user.id}
            userName={`${user.firstName} ${user.lastName}`}
          />
        </span>
      </Table.Cell>
    </Table.Row>
  );
}
