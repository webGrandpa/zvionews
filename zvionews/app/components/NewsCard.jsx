import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NewsCard = ({ 
    slug, 
    imageUrl, 
    category, 
    title, 
    excerpt, 
    author, 
    date, 
    views 
    }) => {
  return (
    <Link
        href={`/news/${slug}`} 
        className="news-card border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
        <div >
            <Image className='w-full h-48 object-cover'
            src={imageUrl} alt={title} width={500} height={300} />
            <div className='p-4'>
                <h3 className='text-lg font-bold mb-2'>
                    {title}</h3>
                <p className='text-gray-600 text-sm mb-4'
                >{excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{author}</span>
                    <span>{date}</span>
                    <span>{views}</span>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NewsCard