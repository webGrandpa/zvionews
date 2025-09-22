// app/news/[slug]/page.js

import Image from 'next/image';
import React from 'react';

const ArticlePage = ({ params }) => {
  // 👇 PASTE THE ARRAY HERE
  const mockArticles = [
    { 
      slug: 'first-article-title',
      imageUrl: 'https://placehold.co/600x400/334155/white?text=News+Image',
      title: 'This is the Title of the First Article',
      excerpt: '...',
      content: 'This is the full content of the first article...', // Make sure you have content
      author: 'Giorgi Khiladze',
      date: 'September 22, 2025',
      views: '1.2k views'
    },
    // ... all your other articles
  ];
  
  const { slug } = params;
  
  // Now this line will work!
  const article = mockArticles.find((post) => post.slug === slug);

  // Add this check in case an article isn't found
  if (!article) {
    return <div>Article not found!</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-8">{article.author} - {article.date}</p>
      <Image src={article.imageUrl} alt={article.title} width={800} height={400} className="w-full object-cover rounded-lg mb-8" />
      <div className="prose">
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default ArticlePage;