// app/profile/page.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const isAdmin = session.user?.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
            <Image 
              src={session.user?.image || "https://placehold.co/96x96/E2E8F0/64748B?text=User"}
              alt="User Profile" 
              fill
              objectFit="cover"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">თქვენი პროფილი</h1>
          <p className="text-sm text-gray-500 mt-1">კეთილი იყოს თქვენი მობრძანება!</p>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-4">
            <span className="text-gray-500 text-lg">👤</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">სახელი</p>
              <p className="text-base text-gray-900 font-semibold">{session.user?.name}</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-4">
            <span className="text-gray-500 text-lg">📧</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">ელ-ფოსტა</p>
              <p className="text-base text-gray-900 font-semibold">{session.user?.email}</p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-6 text-center">
            <Link 
              href="/admin" 
              className="py-3 px-6 inline-block text-white font-semibold rounded-lg shadow-md bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              ადმინ-პანელზე გადასვლა
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}