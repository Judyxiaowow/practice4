import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { TimeRecord } from "@/models/TimeRecord";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const providedSecret = request.headers.get("x-cron-secret");

  if (!cronSecret || providedSecret !== cronSecret) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

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
