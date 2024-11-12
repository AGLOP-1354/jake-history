"use server";

import { postFetch } from "@/src/lib/customFetch";
import { CategoryType } from "../types/category";

export const createCategory = async (name: string) => {
  const response = await postFetch<{ data: CategoryType }>({ url: "/api/category", queryParams: { name } });
  return response.data;
};
