import mongoose, { Schema, Document } from "mongoose";

interface IAccessLog extends Document {
  guestToken?: string | null;
  historyId?: string | null;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

const AccessLogSchema = new Schema<IAccessLog>(
  {
    guestToken: {
      type: String,
      default: null,
      index: true,
    },
    historyId: {
      type: String,
      default: null,
      index: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

const AccessLog = mongoose.models.AccessLog || mongoose.model<IAccessLog>("AccessLog", AccessLogSchema);

export default AccessLog;
