import type { CategoryType } from "./category";

export type HistoryType = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  summary?: string;
  category?: CategoryType;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};
