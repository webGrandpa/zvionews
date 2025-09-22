import Image from "next/image";
import AdBanner from "./components/AdBanner";
import NewsCard from "./components/NewsCard";

export default function Home() {

const mockArticles = [
  { slug: 'first-article-title',
    imageUrl: 'https://placehold.co/600x400/334155/white?text=News+Image',
    title: 'This is the Title of the First Article',
    excerpt: 'Here is a short summary of the article content. It gives a little preview to the reader.',
    author: 'Giorgi Khiladze',
    date: 'September 22, 2025',
    views: '1.2k views',
    content: "lorem wad daw wa dwa dw daw  dwa dwa daw dwa dwa adw daw awd  dwa"
  },
  { slug: 'second-article-title',
    imageUrl: 'https://placehold.co/600x400/334155/white?text=News+Image',
    title: 'This is the Title of the First Article',
    excerpt: 'Here is a short summary of the article content. It gives a little preview to the reader.',
    author: 'Giorgi Khiladze',
    date: 'September 22, 2025',
    views: '1.2k views',
    content: "lorem wad daw wa dwa dw daw  dwa dwa daw dwa dwa adw daw awd  dwa"
  },
  { slug: 'third-article-title',
    imageUrl: 'https://placehold.co/600x400/334155/white?text=News+Image',
    title: 'This is the Title of the First Article',
    excerpt: 'Here is a short summary of the article content. It gives a little preview to the reader.',
    author: 'Giorgi Khiladze',
    date: 'September 22, 2025',
    views: '1.2k views',
    content: "lorem wad daw wa dwa dw daw  dwa dwa daw dwa dwa adw daw awd  dwa"
  },
  { slug: 'fourth-article-title',
    imageUrl: 'https://placehold.co/600x400/334155/white?text=News+Image',
    title: 'This is the Title of the First Article',
    excerpt: 'Here is a short summary of the article content. It gives a little preview to the reader.',
    author: 'Giorgi Khiladze',
    date: 'September 22, 2025',
    views: '1.2k views',
    content: "lorem wad daw wa dwa dw daw  dwa dwa daw dwa dwa adw daw awd  dwa"
  },
  { slug: 'fith-article-title',
    imageUrl: 'https://placehold.co/600x400/334155/white?text=News+Image',
    title: 'This is the Title of the First Article',
    excerpt: 'Here is a short summary of the article content. It gives a little preview to the reader.',
    author: 'Giorgi Khiladze',
    date: 'September 22, 2025',
    views: '1.2k views',
    content: "lorem wad daw wa dwa dw daw  dwa dwa daw dwa dwa adw daw awd  dwa"
  },
  { slug: 'sixth-article-title',
    imageUrl: 'https://placehold.co/600x400/334155/white?text=News+Image',
    title: 'This is the Title of the First Article',
    excerpt: 'Here is a short summary of the article content. It gives a little preview to the reader.',
    author: 'Giorgi Khiladze',
    date: 'September 22, 2025',
    views: '1.2k views',
    content: "lorem wad daw wa dwa dw daw  dwa dwa daw dwa dwa adw daw awd  dwa"
  },
];

  return (
    <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
     <div className="flex flex-col gap-8">
      {mockArticles.map((article) => (
        <NewsCard key={article.slug} {...article} />
      ))}
    </div>
    </main>
  );
}
