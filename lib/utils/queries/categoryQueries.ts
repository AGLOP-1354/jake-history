import { cookies } from "next/headers";

import type { CategoryType } from "@/src/lib/types/category";

import { createClient } from "../supabase/server";

export const getAllCategories = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: categories, error } = await supabase
    .from("category")
    .select("*")
    .order("createdAt", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return null;
  }

  return categories as CategoryType[];
};

export const createCategory = async (categoryName: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: newCategory, error } = await supabase
    .from("category")
    .insert([{ name: categoryName }])
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    return null;
  }

  return newCategory as CategoryType;
};
