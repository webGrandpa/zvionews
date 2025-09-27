import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

async function getPostBySlug(slug) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}

const ArticlePage = async ({ params }) => {
  const post = await getPostBySlug(params.slug);

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <p className="mr-4">
          <span className="font-semibold">ავტორი:</span> {post.author.name}
        </p>
        <p className="mr-4">
          <span className="font-semibold">თარიღი:</span> {post.createdAt.toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">კატეგორია:</span> {post.category.name}
        </p>
      </div>

      <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg">
        <Image 
          src={post.imageUrl} 
          alt={post.title} 
          fill
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div className="prose max-w-none text-gray-800 leading-relaxed">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default ArticlePage;