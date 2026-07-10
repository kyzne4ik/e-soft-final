import css from "./StudentSchedule.module.css";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { ReadOnlyCalendar } from "./ReadOnlyCalendar";
import { SplitView } from "@repo/ui/layouts/split-view";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { useScheduleWidget } from "../model/useScheduleWidget";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";
import type { StreamResponse } from "@repo/schemas";

export function StudentSchedule() {
  const { streams, selected, selectedId, setSelectedId, isLoading } =
    useScheduleWidget();

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <div className={css.sidebar_head}>
          <span className={css.sidebar_title}>Мои потоки</span>
        </div>
        {isLoading ? (
          <StudentScheduleSkeleton />
        ) : streams.length === 0 ? (
          <div className={css.empty}>Вы пока не зачислены ни в один поток</div>
        ) : (
          <StudentScheduleList
            streams={streams}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
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
            </div>
            <div className={css.workspace_body}>
              <WidgetBoundary message="Не удалось загрузить расписание">
                <ReadOnlyCalendar key={selected.id} streamId={selected.id} />
              </WidgetBoundary>
            </div>
          </div>
        )}
      </SplitView.Workspace>
    </SplitView>
  );
}

export function StudentScheduleList({
  streams,
  selectedId,
  setSelectedId,
}: {
  streams: StreamResponse[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
}) {
  return streams.map((stream) => (
    <StreamBanner
      key={stream.id}
      title={stream.name}
      status={stream.status}
      active={stream.id === selectedId}
      onClick={() => setSelectedId(stream.id)}
    />
  ));
}

export function StudentScheduleSkeleton() {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} height={52} border="var(--radius-md)" />
  ));
}
