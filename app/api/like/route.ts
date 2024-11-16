import { NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/src/lib/mongodb";
import History from "@/src/models/History";
import Like from "@/src/models/Like";
import { getGuestToken } from "@/src/lib/utils/token";

export async function POST(request: Request) {
  await dbConnect();

  const { historyId }: { historyId: string } = await request.json();

  if (!historyId) {
    return NextResponse.json({ message: "historyId is required" }, { status: 400 });
  }

  const guestToken = getGuestToken();

  if (!guestToken) {
    return NextResponse.json({ message: "Guest token is required" }, { status: 400 });
  }

  try {
    const existingLike = await Like.findOne({
      historyId,
      guestToken,
    });

    if (existingLike) {
      return NextResponse.json({ message: "Already liked" }, { status: 400 });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await Like.create(
        [
          {
            historyId,
            guestToken,
          },
        ],
        { session }
      );

      await History.findOneAndUpdate({ id: historyId }, { $inc: { likeCount: 1 } }, { session });

      await session.commitTransaction();
      return NextResponse.json({ message: "Like added successfully" }, { status: 201 });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error creating like:", error);
    return NextResponse.json({ message: "Failed to create like" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await dbConnect();

  const { historyId }: { historyId: string } = await request.json();

  if (!historyId) {
    return NextResponse.json({ message: "historyId is required" }, { status: 400 });
  }

  const guestToken = getGuestToken();

  if (!guestToken) {
    return NextResponse.json({ message: "Guest token is required" }, { status: 400 });
  }

  try {
    await Like.deleteOne({ historyId, guestToken });
    await History.findOneAndUpdate({ id: historyId }, { $inc: { likeCount: -1 } });
  } catch (error) {
    console.error("Error deleting like:", error);
  }
}
