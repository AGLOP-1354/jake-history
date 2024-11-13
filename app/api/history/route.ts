import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";
import Category from "@/src/models/Category";

interface HistoryData {
  title: string;
  content: string;
  imageUrl?: string;
  summary?: string;
  categoryId?: string;
}

export async function POST(request: Request) {
  await dbConnect();

  const { title, content, imageUrl, categoryId, summary }: HistoryData = await request.json();

  if (!title || !content) {
    return NextResponse.json({ message: "Title, content are required" }, { status: 400 });
  }

  try {
    const category = await Category.findOne({ id: { $in: categoryId } }).select("_id");
    const categoryObjectId = category?._id;

    const newHistory = new History({
      title,
      content,
      category: categoryObjectId,
      imageUrl,
      summary,
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
  const sortKey = searchParams.get("sortKey");

  try {
    const sortOptions: { [key: string]: 1 | -1 } =
      sortKey === "latest" ? { createdAt: -1 } : sortKey === "name" ? { title: 1 } : {};

    const histories = await History.find({
      deletedAt: null,
    })
      .populate("category")
      .sort(sortOptions);

    return NextResponse.json(histories, { status: 200 });
  } catch (error) {
    console.error("Error fetching histories:", error);
    return NextResponse.json({ message: "Failed to fetch histories" }, { status: 500 });
  }
}
