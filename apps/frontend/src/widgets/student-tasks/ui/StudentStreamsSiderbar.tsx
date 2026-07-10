import css from "./StudentTasks.module.css";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import type { StreamResponse } from "@repo/schemas";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";

export function StudentStreamsSidebar({
  selectedId,
  streams,
  isLoading,
  onSelect,
}: {
  selectedId: number | null;
  streams: StreamResponse[];
  isLoading: boolean;
  onSelect: (id: number) => void;
}) {
  return (
    <>
      <div className={css.sidebar_head}>
        <span className={css.sidebar_title}>Мои потоки</span>
      </div>
      {isLoading ? (
        <StudentStreamsSidebarSkeleton />
      ) : streams.length === 0 ? (
        <div className={css.empty}>Вы пока не зачислены ни в один поток</div>
      ) : (
        <StudentStreamsSidebarList
          streams={streams}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      )}
    </>
  );
}

export function StudentStreamsSidebarSkeleton() {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} height={52} border="var(--radius-md)" />
  ));
}

export function StudentStreamsSidebarList({
  streams,
  onSelect,
  selectedId,
}: {
  streams: StreamResponse[];
  onSelect: (id: number) => void;
  selectedId: number | null;
}) {
  return streams.map((stream) => (
    <StreamBanner
      key={stream.id}
      title={stream.name}
      status={stream.status}
      active={stream.id === selectedId}
      onClick={() => onSelect(stream.id)}
    />
  ));
}
