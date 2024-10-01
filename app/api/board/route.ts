import { connectMongoDB } from "@/lib/mongodb";
import Board from "@/models/board";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const {searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: 'Board ID is required' }, { status: 400 });
    }

    try {
        await connectMongoDB();
        const board = await Board.findById(id);

        if (!board) {
            return NextResponse.json({ message: 'Board not found' }, { status: 404 });
        }

        return NextResponse.json(board);
    } catch (e: any) {
        console.error('Error fetching board:', e);
        return NextResponse.json({ message: 'Internal Server Error', error: e.message }, { status: 500 });
    }
}