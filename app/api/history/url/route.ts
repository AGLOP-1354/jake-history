import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ message: "Url is Required" }, { status: 404 });
  }

  try {
    const history = await History.findOne({ url: decodeURIComponent(url), deletedAt: null }).populate("tags");

    if (!history) {
      return NextResponse.json({ message: "History not found" }, { status: 404 });
    }

    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    console.error("Error fetching history by ID:", error);
    return NextResponse.json({ message: "Failed to fetch history" }, { status: 500 });
  }
}
