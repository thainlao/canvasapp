import { connectMongoDB } from "@/lib/mongodb";
import Board from "@/models/board";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { user } = await req.json();
    const { id } = params;

    if (!user) {
        return NextResponse.json({ message: 'User is required' }, { status: 400 });
    }

    try {
        await connectMongoDB();
        const board = await Board.findById(id);

        if (!board) {
            return NextResponse.json({ message: 'Board not found' }, { status: 404 });
        }

        // Add user to participants if not already included
        if (!board.participants.includes(user)) {
            board.participants.push(user);
            await board.save();
        }

        return NextResponse.json(board);
    } catch (e: any) {
        console.error('Error updating board:', e);
        return NextResponse.json({ message: 'Internal Server Error', error: e.message }, { status: 500 });
    }
}