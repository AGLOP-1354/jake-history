import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";

interface HistoryData {
  title: string;
  content: string;
  imageUrl?: string;
  summary?: string;
  url?: string;
  categoryId?: string;
  tagIds?: string[];
}

export async function POST(request: Request) {
  await dbConnect();

  const { title, content, imageUrl, tagIds = [], summary, categoryId, url }: HistoryData = await request.json();

  if (!title || !content || !url) {
    return NextResponse.json({ message: "Title, content and url are required" }, { status: 400 });
  }

  try {
    const newHistory = new History({ title, content, tagIds, imageUrl, summary, categoryId, url });
    await newHistory.save();
    return NextResponse.json({ message: "History created successfully", data: newHistory }, { status: 201 });
  } catch (error) {
    console.error("Error creating history:", error);
    return NextResponse.json({ message: "Failed to create history" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const histories = await History.find({ deletedAt: null }).sort({ createdAt: -1 });
    return NextResponse.json(histories, { status: 200 });
  } catch (error) {
    console.error("Error fetching histories:", error);
    return NextResponse.json({ message: "Failed to fetch histories" }, { status: 500 });
  }
}