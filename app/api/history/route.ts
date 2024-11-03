import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";
import Tag from "@/src/models/Tag";

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
    const tags = await Tag.find({ id: { $in: tagIds } }).select("_id");
    const tagObjectIds = tags.map((tag) => tag._id);

    const newHistory = new History({
      title,
      content,
      tags: tagObjectIds,
      imageUrl,
      summary,
      categoryId,
      url,
    });
    await newHistory.save();
    return NextResponse.json({ message: "History created successfully", data: newHistory }, { status: 201 });
  } catch (error) {
    console.error("Error creating history:", error);
    return NextResponse.json({ message: "Failed to create history" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const tagName = searchParams.get("tag");

  try {
    let tag = null;
    if (tagName) {
      tag = await Tag.findOne({ name: tagName });
    }

    const histories = await History.find({ deletedAt: null, ...(tag ? { tags: { $in: [tag?._id] } } : {}) })
      .populate("tags")
      .sort({ updatedAt: -1 });
    return NextResponse.json(histories, { status: 200 });
  } catch (error) {
    console.error("Error fetching histories:", error);
    return NextResponse.json({ message: "Failed to fetch histories" }, { status: 500 });
  }
}
