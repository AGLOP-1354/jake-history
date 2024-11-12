import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import Category from "@/src/models/Category";
import generateRandomHexColor from "@/src/lib/utils/getRandomHex";

export async function POST(request: Request) {
  await dbConnect();

  const { name } = await request.json();

  console.log("name", name);
  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existingCategory) {
      return NextResponse.json({ message: "Category already exists" }, { status: 400 });
    }

    let color;
    let isColorUnique = false;

    while (!isColorUnique) {
      color = generateRandomHexColor();
      const existingColor = await Category.findOne({ color });
      if (!existingColor) {
        isColorUnique = true;
      }
    }

    const newCategory = new Category({ name, color });
    await newCategory.save();

    return NextResponse.json({ message: "Category created successfully", data: newCategory }, { status: 201 });
  } catch (error) {
    console.error("create category error", error);
    return NextResponse.json({ message: "Failed to create category" }, { status: 500 });
  }
}
