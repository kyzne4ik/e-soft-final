import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./AdminSchedulePage.module.css";
import { streamByIdQuery } from "@/entities/streams";
import { SplitView } from "@repo/ui/layouts/split-view";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { CreateLessonButton } from "@/features/create-lesson";
import { ScheduleCalendar } from "@/widgets/schedule-calendar";
import { AdminScheduleStreamsSidebar } from "./ui/AdminScheduleStreamsSidebar";

export default function AdminSchedulePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <WidgetBoundary message="Не удалось загрузить потоки">
          <AdminScheduleStreamsSidebar
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </WidgetBoundary>
      </SplitView.Sidebar>
      <SplitView.Workspace>
        {selectedId == null ? (
          <div className={css.empty}>Выберите поток слева</div>
        ) : (
          <AdminScheduleWorkspace key={selectedId} streamId={selectedId} />
        )}
      </SplitView.Workspace>
    </SplitView>
  );
}

function AdminScheduleWorkspace({ streamId }: { streamId: number }) {
  const { data } = useQuery({ ...streamByIdQuery(streamId) });
  const stream = data?.data ?? null;

  return (
    <div className={css.workspace}>
      <div className={css.workspace_head}>
        <span className={css.workspace_title}>
          {stream?.name ?? "Расписание"}
        </span>
        <CreateLessonButton streamId={streamId} />
      </div>
      <div className={css.workspace_body}>
        <WidgetBoundary message="Не удалось загрузить расписание">
          <ScheduleCalendar key={streamId} streamId={streamId} />
        </WidgetBoundary>
      </div>
    </div>
  );
}
