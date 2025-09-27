'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'
import { getServerSession } from "next-auth"; // Правильный импорт
import { authOptions } from "./auth";       // Импортируем authOptions

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

// Функция для проверки, является ли пользователь администратором
async function isAdmin() {
  const session = await getServerSession(authOptions);
  // Предполагается, что в вашей сессии есть объект `user` с полем `role`.
  // Возможно, вам придется настроить коллбэки в auth.js, чтобы это работало.
  return session?.user?.role === 'ADMIN';
}

// CREATE POST
export async function createPost(formData) {
  if (!(await isAdmin())) {
    return { error: 'Access Denied.' };
  }

  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  
  if (!title || !content || !imageUrl) { return { error: 'All fields are required.' }; }

  const slug = title.toLowerCase().replace(/\s+/g, '-');
  const views = "0";
  
  const session = await getServerSession(authOptions);
  const newPost = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      imageUrl,
      views,
      authorId: parseInt(session.user.id),
    },
  });

  // Отправка уведомлений (как в вашем коде)
  // ...

  revalidatePath('/admin');
  redirect('/admin');
}

// DELETE POST
export async function deletePost(postId) {
  if (!(await isAdmin())) {
    return { error: 'Access Denied.' };
  }
  
  if (!postId) { return; }
  
  await prisma.post.delete({
    where: {
      id: parseInt(postId),
    },
  });
  revalidatePath('/admin');
}

// UPDATE POST
export async function updatePost(postId, formData) {
  if (!(await isAdmin())) {
    return { error: 'Access Denied.' };
  }
  
  if (!postId || !formData) { return; }
  
  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();

  if (!title || !content) { return; }
  
  await prisma.post.update({
    where: {
      id: parseInt(postId),
    },
    data: {
      title: title,
      content: content,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
    },
  });

  revalidatePath('/admin');
  redirect('/admin');
}

// REGISTER USER
export async function registerUser(formData) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!name || !email || !password) {
    return { error: 'All fields are required.' };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return { error: 'Email already in use.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'USER',
    },
  });

  return { success: true };
}