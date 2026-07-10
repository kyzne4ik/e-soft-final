import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "../AdminSchedulePage.module.css";
import { streamsQuery } from "@/entities/streams";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import type { StreamResponse } from "@repo/schemas";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";

export interface AdminScheduleStreamsSidebarProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function AdminScheduleStreamsSidebar({
  selectedId,
  onSelect,
}: AdminScheduleStreamsSidebarProps) {
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
        <AdminScheduleStreamsSidebarSkeleton />
      ) : (
        <AdminScheduleStreamsSidebarList
          streams={streams}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      )}
    </>
  );
}

export function AdminScheduleStreamsSidebarSkeleton() {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} height={52} border="var(--radius-md)" />
  ));
}

export function AdminScheduleStreamsSidebarList({
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
