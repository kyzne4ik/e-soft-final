import css from "./MentorSchedule.module.css";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { SplitView } from "@repo/ui/layouts/split-view";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { useScheduleWidget } from "../model/useScheduleWidget";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";
import { MentorReadOnlyCalendar } from "./MentorReadOnlyCalendar";

export function MentorSchedule() {
  const { streams, selected, selectedId, setSelectedId, isLoading } =
    useScheduleWidget();

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <div className={css.sidebar_head}>
          <span className={css.sidebar_title}>Мои потоки</span>
        </div>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={52} border="var(--radius-md)" />
          ))
        ) : streams.length === 0 ? (
          <div className={css.empty}>У вас пока нет потоков</div>
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
            </div>
            <div className={css.workspace_body}>
              <WidgetBoundary message="Не удалось загрузить расписание">
                <MentorReadOnlyCalendar
                  key={selected.id}
                  streamId={selected.id}
                />
              </WidgetBoundary>
            </div>
          </div>
        )}
      </SplitView.Workspace>
    </SplitView>
  );
}
