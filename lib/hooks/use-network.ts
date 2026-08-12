"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEtcNetwork } from "../network";

const REFETCH_INTERVAL = 600_000; // 10 min
const STALE_TIME = 300_000; // 5 min

/**
 * Mainnet only, so there is no chain in the query key and no `useSearchParams()`
 * anywhere beneath it. See the note at the top of `lib/network.ts`.
 */
export function useEtcNetwork() {
  return useQuery({
    queryKey: ["etc-network"],
    queryFn: fetchEtcNetwork,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  });
}
