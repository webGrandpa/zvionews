// components/cards/MostViewedCard.jsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MostViewedCard = ({ slug, imageUrl, title, views }) => {
  return (
    <Link 
      href={`/news/${slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative w-full h-40">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill 
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 leading-tight">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">ნახვები: {views}</p>
      </div>
    </Link>
  );
}

export default MostViewedCard;