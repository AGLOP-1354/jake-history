import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const history = await History.findOne({
      id,
      deletedAt: null,
    });

    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    console.error("Error fetching histories:", error);
    return NextResponse.json({ message: "Failed to fetch histories" }, { status: 500 });
  }
}
