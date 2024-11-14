import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { getModel } from "./mongoose";

interface IHistory extends Document {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  summary?: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  category: { type: typeof mongoose.Schema.Types.ObjectId; ref: string };
}

const HistorySchema = new mongoose.Schema<IHistory>(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    summary: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      sparse: true,
    },
    likeCount: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

HistorySchema.index({ title: "text", content: "text" });
HistorySchema.index({ createdAt: -1 });
HistorySchema.index({ title: 1, createdAt: -1 });
HistorySchema.index({ likeCount: -1, createdAt: -1 });

const History = getModel<IHistory>("History", HistorySchema);
export default History;
