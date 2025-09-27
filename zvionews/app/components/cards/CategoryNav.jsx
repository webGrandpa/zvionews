'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import '../ui/category-button-effect.css';
import '../ui/gradient.css';

const categories = [
  { name: 'დღის ამბები', slug: 'dghis_ambebi' },
  { name: 'სპორტი', slug: 'sporti' },
  { name: 'პოლიტიკა', slug: 'politika' },
  { name: 'მეცნიერება', slug: 'metsniereba' },
  { name: 'ტექნოლოგიები', slug: 'tekhnologiebi' },
];

export default function CategoryNav() {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get('filter') || '';

  const handleFilterClick = (slug) => {
    const newPath = slug ? `/?filter=${slug}` : '/';
    window.location.href = newPath;
  };

  return (
    <ul className="flex flex-col md:flex-row gap-4 gradient-white w-full">
      {categories.map((category) => (
        <li key={category.slug}>
          <button
            onClick={() => handleFilterClick(category.slug)}
            className={`category-button transition-all duration-300
              ${activeFilter === category.slug ? 'active' : ''}
            `}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}