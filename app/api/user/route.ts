import { connectMongoDB } from '@/lib/mongodb.js';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
    const { name, email } = await req.json();
    await connectMongoDB();

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' });
    }

    // Если пользователя нет, создаем нового
    await User.create({ name, email });
    return NextResponse.json({ message: 'User Registered' });
}
