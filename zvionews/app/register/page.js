// In app/register/page.js
'use client'

import { registerUser } from '@/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.target);
    const result = await registerUser(formData);

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect to the login page on successful registration
      router.push('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required className="w-full p-2 border rounded" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}