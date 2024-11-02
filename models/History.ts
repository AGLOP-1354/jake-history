import mongoose, { Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IHistory extends Document {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  summary?: string;
  url: string;
  categoryId?: string;
  tagIds?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  tags: { type: typeof mongoose.Schema.Types.ObjectId; ref: string }[];
}

const HistorySchema = new mongoose.Schema<IHistory>(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    title: {
      type: String,
      required: true,
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
    url: {
      type: String,
      required: true,
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    categoryId: {
      type: String,
      required: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const History: Model<IHistory> = mongoose.models.History || mongoose.model<IHistory>("History", HistorySchema);
export default History;
