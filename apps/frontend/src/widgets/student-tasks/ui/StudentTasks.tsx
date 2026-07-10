import css from "./StudentTasks.module.css";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { SplitView } from "@repo/ui/layouts/split-view";
import { EmptyState } from "@repo/ui/molecules/empty-state";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { TaskCardWithModal } from "@/features/upsert-submission";
import { StudentStreamsSidebar } from "./StudentStreamsSiderbar";
import { useStudentStreams, useStreamTasks } from "../model/useStudentTasks";

function TasksWorkspace({
  streamId,
  streamName,
}: {
  streamId: number;
  streamName: string;
}) {
  const { tasks, isLoading } = useStreamTasks(streamId);

  return (
    <div className={css.workspace}>
      <div className={css.workspace_head}>
        <span className={css.workspace_title}>{streamName}</span>
        <span className={css.workspace_subtitle}>
          Нажмите карточку, чтобы открыть и сдать
        </span>
      </div>
      <div className={css.workspace_body}>
        {isLoading ? (
          <div className={css.grid}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height={160} border="var(--radius-lg)" />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState
            icon="inbox"
            title="Заданий пока нет"
            text="Они появятся здесь, когда ментор их добавит"
          />
        ) : (
          <div className={css.grid}>
            {tasks.map((task) => (
              <TaskCardWithModal key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function StudentTasks() {
  const { streams, selected, selectedId, setSelectedId, isLoading } =
    useStudentStreams();

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <WidgetBoundary message="Не удалось загрузить потоки">
          <StudentStreamsSidebar
            streams={streams}
            selectedId={selectedId}
            isLoading={isLoading}
            onSelect={setSelectedId}
          />
        </WidgetBoundary>
      </SplitView.Sidebar>
      <SplitView.Workspace>
        {selected == null ? (
          <div className={css.empty}>
            {isLoading ? "Загрузка…" : "Выберите поток слева"}
          </div>
        ) : (
          <WidgetBoundary message="Не удалось загрузить задания">
            <TasksWorkspace
              key={selected.id}
              streamId={selected.id}
              streamName={selected.name}
            />
          </WidgetBoundary>
        )}
      </SplitView.Workspace>
    </SplitView>
  );
}
