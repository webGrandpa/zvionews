import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsCard = ({ 
    slug, 
    imageUrl, 
    category, 
    title, 
    excerpt, 
    author, 
    date, 
    views,
    direction = 'flex-row'
    }) => {
  const isCol = direction === 'flex-col';

  return (
    <Link
        href={`/news/${slug}`} 
        className={`
         bg-white rounded-xl overflow-hidden shadow-lg 
            hover:shadow-2xl transform hover:scale-103 
            transition-all duration-300 ease-in-out group
            flex ${direction}
        `}
    >
        <div className={`
            relative w-full h-48 sm:h-64 ${isCol ? '' : 'md:w-1/2'} /* Для row - 50% ширины */
        `}> 
            <Image
                className="
                    w-full h-full object-cover 
                    transition-all duration-300 ease-in-out 
                "
                src={imageUrl} 
                alt={title} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            {category && (
                <span className="
                    absolute top-3 left-3 
                    bg-blue-600 text-white text-xs font-semibold 
                    px-3 py-1 rounded-full 
                    shadow-md z-10 
                ">
                    {category}
                </span>
            )}
        </div>
        
        <div className={`
            p-4 sm:p-6 flex flex-col justify-between h-auto 
            ${isCol ? '' : 'md:w-1/2'} /* Для row - 50% ширины */
        `}>
            <h3 className="
                text-xl font-bold text-gray-800 leading-tight mb-3 
                group-hover:text-blue-900 transition-colors duration-300
            ">
                {title}
            </h3>
            {excerpt && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {excerpt}
                </p>
            )}
            <div className="
                flex flex-wrap items-center justify-between gap-x-3 gap-y-1 
                text-xs text-gray-500 font-medium border-t pt-4 mt-auto border-gray-100
            ">
                {author && <span>ავტორი: {author}</span>}
                {date && <span>თარიღი: {date}</span>}
                {views && <span>ნახვები: {views}</span>}
            </div>
        </div>
    </Link>
  );
}

export default NewsCard;
