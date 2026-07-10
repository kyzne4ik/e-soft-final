import type { TaskResponse } from "@repo/schemas";
import { Table } from "@repo/ui/organisms/table";
import { Icon } from "@repo/ui/atoms/icon";
import { UpdateTaskButton } from "@/features/update-task";
import { DeleteTaskButton } from "@/features/delete-task";
import { cleanRepoUrl, formatDeadline, isOverdue } from "../model/formatters";
import css from "./TasksTable.module.css";

interface TaskRowProps {
  task: TaskResponse;
}

export function TaskRow({ task }: TaskRowProps) {
  return (
    <Table.Row>
      <Table.Cell>
        <span className={css.title}>{task.title}</span>
      </Table.Cell>
      <Table.Cell>
        <span
          className={`${css.deadline} ${isOverdue(task.deadline) ? css.deadline__overdue : ""}`}
        >
          {formatDeadline(task.deadline)}
        </span>
      </Table.Cell>
      <Table.Cell>
        {task.repoTemplate ? (
          <a
            href={task.repoTemplate}
            target="_blank"
            rel="noreferrer"
            className={css.repo}
          >
            <Icon name="github" size={14} />
            {cleanRepoUrl(task.repoTemplate)}
          </a>
        ) : (
          <span className={css.deadline}>—</span>
        )}
      </Table.Cell>
      <Table.Cell align="right">
        <span className={css.actions}>
          <UpdateTaskButton task={task} />
          <DeleteTaskButton taskId={task.id} taskTitle={task.title} />
        </span>
      </Table.Cell>
    </Table.Row>
  );
}
