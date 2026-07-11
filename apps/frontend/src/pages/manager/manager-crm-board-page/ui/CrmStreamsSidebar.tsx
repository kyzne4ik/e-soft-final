import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { streamsQuery } from "@/entities/streams";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import type { StreamResponse } from "@repo/schemas";
import css from "../ManagerCrmBoardPage.module.css";
import { StreamBanner } from "@repo/ui/molecules/stream-banner";

export interface CrmStreamsSidebarProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function CrmStreamsSidebarSkeleton() {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} height={52} border="var(--radius-md)" />
  ));
}

export function CrmStreamsSidebarList({
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

export function CrmStreamsSidebar({
  selectedId,
  onSelect,
}: CrmStreamsSidebarProps) {
  const result = useQuery({ ...streamsQuery(), throwOnError: true });

  const streams = result.data?.data ?? [];
  const first = streams[0];

  useEffect(() => {
    if (selectedId == null && first) onSelect(first.id);
  }, [selectedId, first, onSelect]);

  return (
    <>
      <div className={css.sidebar_head}>
        <span className={css.sidebar_title}>Потоки</span>
      </div>

      {result.isLoading ? (
        <CrmStreamsSidebarSkeleton />
      ) : (
        <CrmStreamsSidebarList
          streams={streams}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      )}
    </>
  );
}
