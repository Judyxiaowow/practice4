import mongoose, { Schema } from "mongoose";

export interface TimeRecordDocument {
  timestamp: Date;
}

const TimeRecordSchema = new Schema<TimeRecordDocument>({
  timestamp: { type: Date, required: true, default: Date.now },
});

export const TimeRecord =
  mongoose.models.TimeRecord ??
  mongoose.model<TimeRecordDocument>("TimeRecord", TimeRecordSchema);
