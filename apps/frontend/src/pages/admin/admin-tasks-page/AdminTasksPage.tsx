import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SplitView } from "@repo/ui/layouts/split-view";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { streamByIdQuery } from "@/entities/streams";
import { CreateTaskButton } from "@/features/create-task";
import { TasksTable } from "@/widgets/admin-tasks-table";
import { AdminTasksStreamsSidebar } from "./ui/AdminTasksStreamsSidebar";
import css from "./AdminTasksPage.module.css";

export default function AdminTasksPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <WidgetBoundary message="Не удалось загрузить потоки">
          <AdminTasksStreamsSidebar
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </WidgetBoundary>
      </SplitView.Sidebar>
      <SplitView.Workspace>
        {selectedId == null ? (
          <div className={css.empty}>Выберите поток слева</div>
        ) : (
          <AdminTasksWorkspace key={selectedId} streamId={selectedId} />
        )}
      </SplitView.Workspace>
    </SplitView>
  );
}

function AdminTasksWorkspace({ streamId }: { streamId: number }) {
  const { data } = useQuery({ ...streamByIdQuery(streamId) });

  const stream = data?.data ?? null;

  return (
    <div className={css.workspace}>
      <div className={css.workspace_head}>
        <span className={css.workspace_title}>{stream?.name ?? "Задания"}</span>
        <CreateTaskButton streamId={streamId} />
      </div>
      <div className={css.workspace_body}>
        <WidgetBoundary message="Не удалось загрузить задания">
          <TasksTable key={streamId} streamId={streamId} />
        </WidgetBoundary>
      </div>
    </div>
  );
}
