import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { StreamResponse } from "@repo/schemas";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { myMentorStreamsQuery } from "@/entities/streams";
import css from "../MentorReviewBoardPage.module.css";

export interface MentorStreamsSidebarProps {
  selectedId: number | null;
  onSelect: (id: number, name?: string) => void;
}

const toArray = <T,>(data: unknown): T[] =>
  Array.isArray(data) ? (data as T[]) : ((data as { data?: T[] })?.data ?? []);

export function MentorStreamsSidebarSkeleton() {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} height={52} border="var(--radius-md)" />
  ));
}

export function MentorStreamsSidebarList({
  streams,
  onSelect,
  selectedId,
}: {
  streams: StreamResponse[];
  onSelect: (id: number, name?: string) => void;
  selectedId: number | null;
}) {
  return streams.map((stream) => (
    <StreamBanner
      key={stream.id}
      title={stream.name}
      status={stream.status}
      active={stream.id === selectedId}
      onClick={() => onSelect(stream.id, stream.name)}
    />
  ));
}

export function MentorStreamsSidebar({
  selectedId,
  onSelect,
}: MentorStreamsSidebarProps) {
  const result = useQuery({ ...myMentorStreamsQuery(), throwOnError: true });
  const streams = toArray<StreamResponse>(result.data);

  const first = streams[0];
  useEffect(() => {
    if (selectedId == null && first) onSelect(first.id, first.name);
  }, [selectedId, first, onSelect]);

  return (
    <>
      <div className={css.sidebar_head}>
        <span className={css.sidebar_title}>Потоки</span>
      </div>

      {result.isLoading ? (
        <MentorStreamsSidebarSkeleton />
      ) : streams.length === 0 ? (
        <p className={css.sidebar_empty}>Нет потоков</p>
      ) : (
        <MentorStreamsSidebarList
          streams={streams}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      )}
    </>
  );
}
