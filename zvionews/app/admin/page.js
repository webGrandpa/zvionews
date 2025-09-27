// app/admin/page.js

import Link from 'next/link';
import DeleteButton from '../components/DeleteButton';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login');
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">ადმინ პანელი</h1>
        <Link 
          href="/admin/posts/new" 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          ახალი პოსტის დამატება
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-lg font-medium text-gray-800">{post.title}</h2>
              
              <div className="flex items-center gap-4">
                <Link 
                  href={`/admin/posts/edit/${post.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  რედაქტირება
                </Link>
                <DeleteButton postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}