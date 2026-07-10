import { useEffect } from "react";
import css from "../AdminTasksPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { streamsQuery } from "@/entities/streams";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import type { StreamResponse } from "@repo/schemas";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";

export interface AdminTasksStreamsSidebarProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function AdminTasksStreamsSidebar({
  selectedId,
  onSelect,
}: AdminTasksStreamsSidebarProps) {
  const result = useQuery({ ...streamsQuery(), throwOnError: true });

  const streams = result.data?.data ?? [];
  const firstId = streams[0]?.id;

  useEffect(() => {
    if (selectedId == null && firstId != null) onSelect(firstId);
  }, [selectedId, firstId, onSelect]);

  return (
    <>
      <div className={css.sidebar_head}>
        <span className={css.sidebar_title}>Потоки</span>
      </div>
      {result.isLoading ? (
        <AdminTasksStreamsSidebarSkeleton />
      ) : (
        <AdminTasksStreamsSidebarList
          streams={streams}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      )}
    </>
  );
}

export function AdminTasksStreamsSidebarSkeleton() {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} height={52} border="var(--radius-md)" />
  ));
}

export function AdminTasksStreamsSidebarList({
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
