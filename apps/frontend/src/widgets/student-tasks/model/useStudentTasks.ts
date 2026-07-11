import { tasksQuery } from "@/entities/tasks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { myStudentStreamsQuery } from "@/entities/streams";

export function useStudentStreams() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    ...myStudentStreamsQuery(),
    throwOnError: true,
  });

  const streams = useMemo(() => data?.data ?? [], [data?.data]);
  const firstId = streams[0]?.id;

  useEffect(() => {
    if (selectedId == null && firstId != null) setSelectedId(firstId);
  }, [selectedId, firstId]);

  const selected = streams.find((s) => s.id === selectedId) ?? null;

  return { streams, selected, selectedId, setSelectedId, isLoading };
}

export function useStreamTasks(streamId: number) {
  const { data, isLoading } = useQuery({
    ...tasksQuery({ streamId }),
    throwOnError: true,
  });

  const tasks = useMemo(() => data?.data.data ?? [], [data?.data]);

  return { tasks, isLoading };
}
