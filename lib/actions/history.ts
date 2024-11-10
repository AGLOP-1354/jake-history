"use server";

import { getFetch } from "../customFetch";
import { HistoryType } from "../types/history";

const getHistories = async ({ tag, searchValue }: { tag?: string; searchValue?: string }) => {
  try {
    const res: HistoryType[] = await getFetch({
      url: "/api/history",
      queryParams: { tag: tag || "", searchValue: searchValue || "" },
    });

    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getHistories };
