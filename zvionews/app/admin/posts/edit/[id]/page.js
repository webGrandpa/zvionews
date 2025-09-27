// app/admin/posts/edit/[id]/page.js
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../auth"; 
import { prisma } from '@/lib/prisma';
import { updatePost } from '../../new/actions'

async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
  return categories;
}

export default async function EditPostPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login');
  }

  const postId = parseInt(params.id);
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  const categories = await getCategories();

  if (!post) {
    redirect('/admin/posts'); // Перенаправляем на правильный маршрут
  }

  const updatePostWithId = updatePost.bind(null, postId);

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">სტატიის რედაქტირება</h1>
      
      <form action={updatePostWithId} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">სათაური</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
            defaultValue={post?.title}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">სურათის ლინკი</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
            defaultValue={post?.imageUrl}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">ტექსტი</label>
          <textarea
            id="content"
            name="content"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
            rows="10"
            defaultValue={post?.content}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">კატეგორია</label>
          <select
            id="category"
            name="categoryId"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
            defaultValue={post?.categoryId}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
        >
          შენახვა
        </button>
      </form>
    </div>
  );
}