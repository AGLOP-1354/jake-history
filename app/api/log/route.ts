import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import AccessLog from "@/src/models/AccessLog";

export async function POST(req: NextRequest) {
  const { guestToken, historyId, ipAddress, userAgent } = await req.json();

  await dbConnect();

  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

    const existingLog = await AccessLog.findOne({
      guestToken,
      historyId,
      ipAddress,
      createdAt: { $gte: startOfDay },
    });

    if (!existingLog) {
      await AccessLog.create({ guestToken, historyId, ipAddress, userAgent });
    }

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const accessLogs = await AccessLog.find();

    return NextResponse.json(accessLogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
