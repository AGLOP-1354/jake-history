import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { getModel } from "./mongoose";

interface ILike extends Document {
  id: string;
  historyId: string;
  guestToken: string;
  createdAt: Date;
  deletedAt?: Date | null;
}

const LikeSchema = new mongoose.Schema<ILike>(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    historyId: {
      type: String,
      required: true,
    },
    guestToken: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

LikeSchema.index({ historyId: 1, createdAt: -1 });

const Like = getModel<ILike>("Like", LikeSchema);
export default Like;
