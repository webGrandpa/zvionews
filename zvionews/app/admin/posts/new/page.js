import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth"; 
import { createPost } from './actions'; 
import React from 'react';
import { prisma } from '@/lib/prisma';

async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
  return categories;
}

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  const categories = await getCategories();

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">ახალი სტატიის შექმნა</h1>
      <form action={createPost} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">სათაური</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="შეიყვანეთ სტატიის სათაური"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">სურათის ლინკი</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="ჩასვით სურათის ლინკი"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">ტექსტი</label>
          <textarea
            id="content"
            name="content"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows="10"
            placeholder="დაიწყეთ წერა აქ..."
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">კატეგორია</label>
          <select
            id="category"
            name="categoryId"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          >
            <option value="">აირჩიეთ კატეგორია</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          შექმნა
        </button>
      </form>
    </div>
  );
}