import mongoose from "mongoose";

export function getModel<T>(modelName: string, schema: mongoose.Schema): mongoose.Model<T> {
  const existingModel = mongoose.models[modelName];
  return existingModel || mongoose.model<T>(modelName, schema);
}
