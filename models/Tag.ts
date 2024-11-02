import mongoose, { Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface ITag extends Document {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const TagSchema = new mongoose.Schema<ITag>(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    name: {
      type: String,
      required: true,
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

const Tag: Model<ITag> = mongoose.models.Tag || mongoose.model<ITag>("Tag", TagSchema);
export default Tag;
