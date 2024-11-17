"use client";

import { useMemo } from "react";
import { AccessLogType } from "@/src/lib/types/accessLog";
import { HistoryType } from "@/src/lib/types/history";
import { MaximumHitsByHistoryIdType } from "@/src/lib/types/accessLog";

type Params = {
  accessLogs: Record<string, AccessLogType[]>;
  histories: HistoryType[];
  maximumHitsByHistoryId: MaximumHitsByHistoryIdType;
};

export const useAnalyticsData = ({ accessLogs, histories, maximumHitsByHistoryId }: Params) => {
  const totalAccessLogs = useMemo(() => {
    return Object.values(accessLogs).reduce((acc, log) => acc + log.length, 0);
  }, [accessLogs]);

  const totalUsers = useMemo(() => {
    const uniqueUsers = new Set(accessLogs.home.map((log) => log.guestToken));
    return uniqueUsers.size;
  }, [accessLogs]);

  const maximumHitsByHistoryIdTitle = useMemo(() => {
    return histories.find((history) => history.id === maximumHitsByHistoryId.historyId)?.title;
  }, [histories, maximumHitsByHistoryId]);

  return {
    totalAccessLogs,
    totalUsers,
    maximumHitsByHistoryIdTitle,
  };
};
