import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "../StudentGradesPage.module.css";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import type { StreamResponse } from "@repo/schemas";
import { myStudentStreamsQuery } from "@/entities/streams";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";

export interface GradesSidebarProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function GradesSidebar({ selectedId, onSelect }: GradesSidebarProps) {
  const result = useQuery({ ...myStudentStreamsQuery(), throwOnError: true });

  const streams = result.data?.data ?? [];
  const firstId = streams[0]?.id;

  useEffect(() => {
    if (selectedId == null && firstId != null) onSelect(firstId);
  }, [selectedId, firstId, onSelect]);

  return (
    <>
      <div className={css.sidebar_head}>
        <span className={css.sidebar_title}>Мои потоки</span>
      </div>
      {result.isLoading ? (
        <GradesSidebarSkeleton />
      ) : streams.length === 0 ? (
        <p className={css.sidebar_empty}>Нет потоков</p>
      ) : (
        <GradesSidebarList
          streams={streams}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      )}
    </>
  );
}

export function GradesSidebarSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <Skeleton key={i} height={52} border="var(--radius-md)" />
  ));
}

export function GradesSidebarList({
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
