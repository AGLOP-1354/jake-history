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

CategorySchema.index({ name: 1, createdAt: -1 }); // 복합 쿼리에 유용
CategorySchema.index({ name: "text" }); // 텍스트 검색
CategorySchema.index({ id: 1 }, { unique: true }); // id가 고유하므로 name과의 조합 인덱스는 불필요

const Category = getModel<ICategory>("Category", CategorySchema);
export default Category;
