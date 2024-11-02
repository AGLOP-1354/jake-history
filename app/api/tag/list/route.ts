import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import Tag from "@/src/models/Tag";

interface TagData {
  tagNames: string[];
}

export async function POST(request: Request) {
  await dbConnect();

  const { tagNames }: TagData = await request.json();

  if (!tagNames || tagNames.length === 0) {
    return NextResponse.json({ message: "tagNames are required" }, { status: 400 });
  }

  try {
    const existingTags = await Tag.find({ name: { $in: tagNames } });
    const existingTagNames = existingTags.map((tag) => tag.name);

    const newTagNames = tagNames.filter((name) => !existingTagNames.includes(name));
    const newTags = await Tag.create(newTagNames.map((name) => ({ name })));

    return NextResponse.json(
      {
        message: "Tags processed successfully",
        data: [...existingTags, ...newTags],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tags:", error);
    return NextResponse.json({ message: "Failed to process tags" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const tags = await Tag.find({ deletedAt: null }).sort({ createdAt: -1 });
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ message: "Failed to fetch tags" }, { status: 500 });
  }
}
