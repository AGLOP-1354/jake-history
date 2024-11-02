import { TagType } from "@/src/lib/types/tag";

export type HistoryType = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  summary?: string;
  url?: string;
  categoryId?: string;
  tags?: TagType[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};
