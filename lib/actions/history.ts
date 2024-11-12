"use server";

import { getFetch } from "../customFetch";
import { HistoryType } from "../types/history";

const getHistories = async () => {
  try {
    const res: HistoryType[] = await getFetch({
      url: "/api/history",
    });

    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getHistories };
