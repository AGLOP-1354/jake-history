import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const history = await History.findOne({
      id,
      deletedAt: null,
    }).populate("category");

    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { id, content, title, summary, categoryId } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    await dbConnect();

    const history = await History.findOneAndUpdate(
      { id },
      { content, title, summary, categoryId, updatedAt: new Date() },
      { new: true }
    );

    if (!history) {
      return NextResponse.json({ error: "History not found" }, { status: 404 });
    }

    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
