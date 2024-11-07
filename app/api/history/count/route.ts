import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";
import Tag from "@/src/models/Tag";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const tagName = searchParams.get("tag");

  try {
    let tag: any = null;
    if (tagName) {
      tag = await Tag.findOne({ name: tagName });
    }

    const historyCounts = await History.countDocuments({
      deletedAt: null,
      ...(tag ? { tags: { $in: [tag?._id] } } : {}),
    });

    return NextResponse.json(historyCounts, { status: 200 });
  } catch (error) {
    console.error("Error fetching history count:", error);
    return NextResponse.json({ message: "Failed to fetch history count" }, { status: 500 });
  }
}
