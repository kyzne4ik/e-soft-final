import { useEffect } from "react";
import css from "../AdminStreamsPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { streamsQuery } from "@/entities/streams";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import type { StreamResponse } from "@repo/schemas";
import { CreateStreamButton } from "@/features/create-stream";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";

export interface AdminStreamsSidebarProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function AdminStreamsSidebar({
  selectedId,
  onSelect,
}: AdminStreamsSidebarProps) {
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
        <span className={css.sidebar_head_button}>
          <CreateStreamButton />
        </span>
      </div>
      {result.isLoading ? (
        <AdminStreamsSidebarSkeleton />
      ) : (
        <AdminStreamsSidebarList
          streams={streams}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      )}
    </>
  );
}

export function AdminStreamsSidebarSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <Skeleton key={index} height={52} border="var(--radius-md)" />
  ));
}

export function AdminStreamsSidebarList({
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
