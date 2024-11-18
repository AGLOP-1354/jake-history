import { cookies } from "next/headers";
import dayjs from "dayjs";

import { createClient } from "../supabase/server";

export async function getHistories(sortKey: string = "latest") {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("history")
      .select(
        `
        *,
        category:category(
          id,
          name,
          color
        )
      `
      )
      .order(sortKey === "latest" ? "createdAt" : "title", { ascending: sortKey === "name" });

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error("Error fetching histories:", error);
    return { success: false, error };
  }
}

export const getHistoryById = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data } = await supabase.from("history").select("*, category(*)").eq("id", id).single();
    return data;
  } catch (error) {
    console.error("Error fetching history by id:", error);
    return { success: false, error };
  }
};

export const getHistoriesByCategory = async (categoryId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data = [] } = await supabase.from("history").select("*").eq("categoryId", categoryId);
    return data;
  } catch (error) {
    console.error("Error fetching histories by category:", error);
    return { success: false, error };
  }
};

type HistoryData = {
  title: string;
  content: string;
  imageUrl?: string;
  categoryId?: string;
  summary?: string;
};

export const createHistory = async (historyData: HistoryData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("history")
    .insert({
      title: historyData.title,
      content: historyData.content,
      imageUrl: historyData.imageUrl,
      categoryId: historyData.categoryId,
      summary: historyData.summary,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating history:", error);
    throw error;
  }

  return data;
};

export const updateHistory = async (historyId: string, historyData: HistoryData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("history")
    .update({
      title: historyData.title,
      content: historyData.content,
      imageUrl: historyData.imageUrl,
      categoryId: historyData.categoryId,
      summary: historyData.summary,
      updatedAt: dayjs().toISOString(),
    })
    .eq("id", historyId)
    .select()
    .single();

  if (error) {
    console.error("Error updating history:", error);
    throw error;
  }

  return data;
};
