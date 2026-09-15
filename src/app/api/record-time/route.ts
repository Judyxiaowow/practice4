import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { TimeRecord } from "@/models/TimeRecord";

export async function GET() {
  await connectToDatabase();
  const record = await TimeRecord.create({ timestamp: new Date() });

  return NextResponse.json({
    success: true,
    record: {
      id: record._id,
      timestamp: record.timestamp,
    },
  });
}
