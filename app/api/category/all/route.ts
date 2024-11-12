import { NextResponse } from "next/server";

import dbConnect from "@/src/lib/mongodb";
import Category from "@/src/models/Category";

export async function GET() {
  await dbConnect();

  try {
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
  }
}
