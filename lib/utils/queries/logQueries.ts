import { cookies } from "next/headers";
import dayjs from "dayjs";

import { createClient } from "../supabase/server";

export async function insertAccessLog(data: {
  guestToken: string;
  historyId?: string;
  ipAddress: string;
  userAgent: string;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const startOfDay = dayjs().startOf("day").toISOString();

    let query = supabase.from("accessLog").select().eq("guestToken", data.guestToken).gte("createdAt", startOfDay);

    if (data.historyId) {
      query = query.eq("historyId", data.historyId);
    } else {
      query = query.is("historyId", null);
    }

    const { data: existingLog } = await query.single();

    if (!existingLog) {
      const { error } = await supabase.from("accessLog").insert(data);

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Error inserting access log:", error);
    return { success: false, error };
  }
}

export async function getAccessLogs() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase.from("accessLog").select("*");

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error("Error fetching access logs:", error);
    return { success: false, error };
  }
}

export const getAccessLogsByHistoryId = async (historyId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data } = await supabase.from("accessLog").select("*").eq("historyId", historyId);
    return data;
  } catch (error) {
    console.error("Error fetching access logs:", error);
    return { success: false, error };
  }
};
