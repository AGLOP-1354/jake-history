import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import AccessLog from "@/src/models/AccessLog";

async function GET() {
  await dbConnect();

  try {
    // historyId가 없는 경우의 일별 최대값
    const maxWithoutHistory = await AccessLog.aggregate([
      {
        $match: {
          historyId: null,
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    // historyId별 일별 최대값
    const maxWithHistory = await AccessLog.aggregate([
      {
        $match: {
          historyId: { $ne: null },
        },
      },
      {
        $group: {
          _id: {
            historyId: "$historyId",
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    return NextResponse.json(
      {
        maximumHits: {
          date: maxWithoutHistory[0]?._id.date,
          count: maxWithoutHistory[0]?.count || 0,
        },
        maximumHitsByHistoryId: {
          date: maxWithHistory[0]?._id.date,
          historyId: maxWithHistory[0]?._id.historyId,
          count: maxWithHistory[0]?.count || 0,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/log/maximum error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export { GET };
