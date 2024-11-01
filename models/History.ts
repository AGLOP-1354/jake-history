import mongoose, { Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IHistory extends Document {
  id: string;
  title: string;
  content: string;
  tagIds: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
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
    tagIds: {
      type: [String],
      default: [],
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

const History: Model<IHistory> = mongoose.models.History || mongoose.model<IHistory>('History', HistorySchema);
export default History;
