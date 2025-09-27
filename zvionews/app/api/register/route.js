// app/api/register/route.js

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // Возвращаем успешный ответ
        return NextResponse.json({ message: 'User registered successfully!', user }, { status: 201 });

    } catch (error) {
        // Обработка ошибок
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'User registration failed.' }, { status: 500 });
    }
}