import { connectMongoDB } from "@/lib/mongodb";
import Board from "@/models/board";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const {name, fieldOfWork, createdBy} = await req.json();

    if (!createdBy) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectMongoDB();
        const newBoard = await Board.create({
            name, fieldOfWork, createdBy,
            participants: [createdBy],
        })

        return NextResponse.json(newBoard);
    } catch(e: any) {
        console.error('Error creating board:', e);
        return NextResponse.json({ message: 'Internal Server Error', error: e.message}, { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const createdBy = searchParams.get("createdBy");

    console.log(createdBy)

    if (!createdBy) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectMongoDB();
        const boards = await Board.find({ participants: createdBy });
        
        return NextResponse.json(boards);
    } catch (e: any) {
        console.error('Error fetching boards:', e);
        return NextResponse.json({ message: 'Internal Server Error', error: e.message }, { status: 500 });
    }
}