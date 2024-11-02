import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import Tag from "@/src/models/Tag";

interface TagData {
  name: string;
}

export async function POST(request: Request) {
  await dbConnect();

  const { name }: TagData = await request.json();

  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const newTag = await Tag.create({ name });
    return NextResponse.json({ message: "Tag created successfully", data: newTag }, { status: 201 });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json({ message: "Failed to create tag" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const tags = await Tag.findOne({ deletedAt: null }).sort({ createdAt: -1 });
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ message: "Failed to fetch tags" }, { status: 500 });
  }
}
