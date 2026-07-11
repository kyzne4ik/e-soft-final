import { useEffect, useState } from "react";
import css from "./ManagerSchedule.module.css";
import { useQuery } from "@tanstack/react-query";
import { streamsQuery } from "@/entities/streams";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { SplitView } from "@repo/ui/layouts/split-view";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { CreateLessonButton } from "@/features/create-lesson";
import { ScheduleCalendar } from "@/widgets/schedule-calendar";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";

export function ManagerSchedule() {
  const { data, isLoading } = useQuery(streamsQuery());
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const streams = data?.data ?? [];
  const firstId = streams[0]?.id;

  useEffect(() => {
    if (selectedId == null && firstId != null) setSelectedId(firstId);
  }, [selectedId, firstId]);

  const selected = streams.find((stream) => stream.id === selectedId) ?? null;

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <div className={css.sidebar_head}>
          <span className={css.sidebar_title}>Потоки</span>
        </div>

        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={52} border="var(--radius-md)" />
          ))
        ) : streams.length === 0 ? (
          <div className={css.empty}>Нет потоков</div>
        ) : (
          streams.map((stream) => (
            <StreamBanner
              key={stream.id}
              title={stream.name}
              status={stream.status}
              active={stream.id === selectedId}
              onClick={() => setSelectedId(stream.id)}
            />
          ))
        )}
      </SplitView.Sidebar>

      <SplitView.Workspace>
        {selected == null ? (
          <div className={css.empty}>
            {isLoading ? "Загрузка…" : "Выберите поток слева"}
          </div>
        ) : (
          <div className={css.workspace}>
            <div className={css.workspace_head}>
              <span className={css.workspace_title}>{selected.name}</span>
              <CreateLessonButton streamId={selected.id} />
            </div>
            <div className={css.workspace_body}>
              <WidgetBoundary message="Не удалось загрузить расписание">
                <ScheduleCalendar key={selected.id} streamId={selected.id} />
              </WidgetBoundary>
            </div>
          </div>
        )}
      </SplitView.Workspace>
    </SplitView>
  );
}
