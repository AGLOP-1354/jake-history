import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  try {
    const history = await History.findOne({ url });
    const isDuplicateHistory = !!history;

    return NextResponse.json(isDuplicateHistory, { status: 200 });
  } catch (error) {
    console.error("Error fetching validate history one:", error);
    return NextResponse.json({ message: "Failed to fetch validate history one" }, { status: 500 });
  }
}
