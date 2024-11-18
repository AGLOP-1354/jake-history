import { cookies } from "next/headers";
import { createClient } from "@/src/lib/utils/supabase/server";
import { AccessLogType } from "@/src/lib/types/accessLog";

export const getAccessLogs = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: accessLogs, error } = await supabase
    .from("accessLog")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching access logs:", error);
    return null;
  }

  return accessLogs as AccessLogType[];
};

export const getMaximumHits = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // historyId가 없는 경우의 일별 최대값
  const { data: maxWithoutHistory, error: error1 } = await supabase.rpc("get_max_hits_without_history");

  // historyId별 일별 최대값
  const { data: maxWithHistory, error: error2 } = await supabase.rpc("get_max_hits_by_history");

  if (error1 || error2) {
    console.error("Error fetching maximum hits:", error1 || error2);
    return null;
  }

  return {
    maximumHits: maxWithoutHistory?.[0] || { date: null, count: 0 },
    maximumHitsByHistoryId: maxWithHistory?.[0] || { date: null, historyId: null, count: 0 },
  };
};
