// app/admin/posts/new/actions.js

'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth"; 
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

export async function createPost(formData) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  
  if (!session || session.user?.role !== 'ADMIN') {
    return { error: 'Access Denied.' };
  }

  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const categoryId = formData.get('categoryId');

  if (!title || !content || !imageUrl || !categoryId) {
    return { error: 'All fields are required.' };
  }

  const slug = slugify(title, {
    locale: 'ka',
    lower: true,
    strict: true,
    trim: true,
  });

  const views = '0';

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      imageUrl,
      views,
      author: {
        connect: {
          id: parseInt(session.user.id),
        },
      },
      category: {
        connect: {
          id: parseInt(categoryId),
        },
      },
    },
  });

redirect('/admin');
}