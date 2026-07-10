import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { crmService } from "@/shared/api";
import type { LeadQuery } from "@repo/schemas";

const leadsQueryKey = "leads";

export const leadsQuery = (query?: LeadQuery) =>
  ({
    queryKey: [leadsQueryKey, "list", query],
    queryFn: () => crmService.leads.getAll(query).then((r) => r.data ?? []),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const leadByIdQuery = (id: number) =>
  ({
    queryKey: [leadsQueryKey, "byId", id],
    queryFn: () => crmService.leads.getById(id).then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const useInvalidateLeads = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [leadsQueryKey],
    });
};
