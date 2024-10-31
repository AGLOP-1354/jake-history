// src/app/api/history/[id]/route.ts
import dbConnect from '@/src/lib/mongodb';
import History from '@/src/models/History';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;

  try {
    const history = await History.findOne({ id, deletedAt: null });

    if (!history) {
      return NextResponse.json({ message: 'History not found' }, { status: 404 });
    }

    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    console.error('Error fetching history by ID:', error);
    return NextResponse.json({ message: 'Failed to fetch history' }, { status: 500 });
  }
}
