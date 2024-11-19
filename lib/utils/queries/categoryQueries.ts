import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

import type { CategoryType } from "@/src/lib/types/category";

import { createClient } from "../supabase/server";
import getContrastingTextColor from "../getContrastingTextColor";
import generateRandomHexColor from "../getRandomHex";

export const getAllCategories = async () => {
  const cookieStore = cookies();

  return unstable_cache(
    async (cookieStore) => {
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
    },
    ["categories"],
    {
      revalidate: false,
      tags: ["categories"],
    }
  )(cookieStore);
};

export const createCategory = async (categoryName: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let color;
  do {
    color = generateRandomHexColor();
  } while (getContrastingTextColor(color) === "#000000");

  const { data: newCategory, error } = await supabase
    .from("category")
    .insert([
      {
        name: categoryName,
        color: color,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    return null;
  }

  return newCategory as CategoryType;
};
