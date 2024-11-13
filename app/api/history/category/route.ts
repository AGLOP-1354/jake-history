import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  try {
    const histories = await History.find({
      category: categoryId,
      deletedAt: null,
    }).sort({ createdAt: -1 });

    return NextResponse.json(histories, { status: 200 });
  } catch (error) {
    console.error("Error fetching histories by category:", error);
    return NextResponse.json({ message: "Failed to fetch histories by category" }, { status: 500 });
  }
}
