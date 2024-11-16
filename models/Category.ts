import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { getModel } from "./mongoose";

interface ICategory extends Document {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  color: string;
}

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
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

CategorySchema.index({ name: 1, createdAt: -1 });
CategorySchema.index({ name: "text" });
CategorySchema.index({ id: 1 }, { unique: true });

const Category = getModel<ICategory>("Category", CategorySchema);
export default Category;
