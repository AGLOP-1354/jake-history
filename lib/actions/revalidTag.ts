"use server";
import { revalidateTag as _revalidateTag } from "next/cache";

export const revalidateTag = async (tag: string) => {
  await _revalidateTag(tag);
};

export const revalidateTags = async (tags: string[]) => {
  await Promise.all(tags.map((tag) => revalidateTag(tag)));
};
