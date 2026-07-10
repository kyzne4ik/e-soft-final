import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { LeadQuery, LeadStatus } from "@repo/schemas";
import { leadsQuery } from "@/entities/leads";
import { streamsQuery } from "@/entities/streams";
import { useUpdateLeadStatus } from "@/features/update-lead-status";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { buildBoard } from "./board";

export function useCrmBoard(query?: LeadQuery) {
  const { getToast } = useToast();
  const [version, setVersion] = useState(0);

  const { data: leadsData, isLoading } = useQuery({
    ...leadsQuery(query),
    throwOnError: true,
  });
  const { data: streamsData } = useQuery(streamsQuery());

  const { updateStatus } = useUpdateLeadStatus({
    async onError(error) {
      setVersion((v) => v + 1);
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Не удалось изменить статус заявки",
      });
    },
  });

  const streamNames = useMemo(() => {
    const streams =
      streamsData && !Array.isArray(streamsData) ? streamsData.data : [];
    return new Map(streams.map((stream) => [stream.id, stream.name] as const));
  }, [streamsData]);

  const leads = useMemo(
    () => (leadsData && !Array.isArray(leadsData) ? leadsData.data : []),
    [leadsData],
  );
  const leadById = useMemo(
    () => new Map(leads.map((lead) => [lead.id, lead] as const)),
    [leads],
  );
  const board = useMemo(() => buildBoard(leads), [leads]);

  const handleMove = (cardId: string, from: string, to: string) => {
    if (from === to) return;
    updateStatus({ leadId: Number(cardId), status: to as LeadStatus });
  };

  return {
    board,
    leads,
    leadById,
    streamNames,
    isLoading,
    version,
    handleMove,
  };
}
