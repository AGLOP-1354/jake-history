"use server";

import { createCategory as createCategoryQuery } from "@/src/lib/utils/queries/categoryQueries";

export const createCategory = async (name: string) => {
  try {
    const response = await createCategoryQuery(name);
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
