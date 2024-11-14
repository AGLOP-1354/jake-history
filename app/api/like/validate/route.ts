import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import Like from "@/src/models/Like";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const historyId = searchParams.get("historyId");
  const guestToken = searchParams.get("guestToken");

  if (!historyId) {
    return NextResponse.json({ message: "historyId is required" }, { status: 400 });
  }

  if (!guestToken) {
    return NextResponse.json({ message: "Guest token is required" }, { status: 400 });
  }

  try {
    const existingLike = await Like.findOne({
      historyId,
      guestToken,
    });

    return NextResponse.json(!!existingLike, { status: 200 });
  } catch (error) {
    console.error("Error validate like:", error);
    return NextResponse.json({ message: "Failed to validate like" }, { status: 500 });
  }
}
