import { useQuery } from "@tanstack/react-query";
import { leadByIdQuery } from "@/entities/leads";
import { streamsQuery } from "@/entities/streams";

export function useLeadDetails(leadId: number) {
  const { data: leadRes, isLoading } = useQuery({
    ...leadByIdQuery(leadId),
    throwOnError: true,
  });
  const lead = leadRes?.data ?? null;

  const { data: streamsData } = useQuery(streamsQuery());
  const streamName =
    ((lead ?? [])
      ? streamsData?.data.find((s) => s.id === lead?.targetStreamId)?.name
      : undefined) ?? "";

  return { lead, streamName, isLoading };
}
