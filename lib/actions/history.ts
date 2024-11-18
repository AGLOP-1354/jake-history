"use server";

import {
  createHistory as createHistoryQuery,
  updateHistory as updateHistoryQuery,
} from "@/src/lib/utils/queries/historyQueries";

const createHistory = async (historyData: {
  title: string;
  content: string;
  imageUrl?: string;
  categoryId?: string;
  summary?: string;
}) => {
  try {
    const response = await createHistoryQuery(historyData);
    return response;
  } catch (error) {
    console.error("Error creating history:", error);
    throw error;
  }
};

const updateHistory = async (
  historyId: string,
  historyData: {
    title: string;
    content: string;
  }
) => {
  try {
    const response = await updateHistoryQuery(historyId, historyData);
    return response;
  } catch (error) {
    console.error("Error updating history:", error);
    throw error;
  }
};

export { createHistory, updateHistory };
