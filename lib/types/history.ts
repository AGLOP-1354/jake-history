import type { CategoryType } from "./category";

export type HistoryType = {
  _id: string;
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  summary?: string;
  category?: CategoryType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};
