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
    const tags = await Tag.aggregate([
      { $match: { deletedAt: null } },
      {
        $lookup: {
          from: "histories",
          localField: "_id",
          foreignField: "tags",
          as: "histories",
        },
      },
      {
        $addFields: {
          historyCount: { $size: "$histories" }, // histories의 길이를 historyCount 필드로 추가
        },
      },
      {
        $project: {
          histories: 0, // 불필요한 histories 배열은 제외하고 반환
        },
      },
    ]);

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ message: "Failed to fetch tags" }, { status: 500 });
  }
}
