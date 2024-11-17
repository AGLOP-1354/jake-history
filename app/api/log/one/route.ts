import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import AccessLog from "@/src/models/AccessLog";

async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const historyId = searchParams.get("historyId");

  if (!historyId) {
    return NextResponse.json({ error: "History ID is required" }, { status: 400 });
  }

  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const accessLogs = await AccessLog.find({
      historyId,
      createdAt: { $gte: oneWeekAgo },
    });

    return NextResponse.json(accessLogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export { GET };
