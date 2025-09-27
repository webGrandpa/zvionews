import { PrismaClient } from '@prisma/client';
import Header from './components/Header';
import NewsCard from './components/cards/NewsCard';

const prisma = new PrismaClient();

async function getPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true, category: true },
  });
  return posts;
}

export default async function HomePage({ searchParams }) {
  const allPosts = await getPosts();

  const mostViewedPosts = allPosts
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);
  
  const filteredPosts = searchParams.filter
    ? allPosts.filter(post => post.category?.slug === searchParams.filter)
    : allPosts;

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="pt-10 p-4">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          ახალი ამბები
        </h1>
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            სტატიები არ მოიძებნა.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredPosts.map((post) => (
              <NewsCard
                key={post.id}
                slug={post.slug}
                imageUrl={post.imageUrl}
                category={post.category?.name}
                title={post.title}
                excerpt={post.content.substring(0, 150) + '...'}
                author={post.author.name || 'Anonymous'}
                date={post.createdAt.toLocaleDateString()}
                views={post.views}
                direction="md:flex-row flex-col"
              />
            ))}
          </div>
        )}

        <hr className="my-12 border-t-2 border-gray-200" />

        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          ყველაზე ნახვადი პოსტები
        </h2>
        {mostViewedPosts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            პოპულარული სტატიები არ მოიძებნა.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mostViewedPosts.map((post) => (
              <NewsCard
                key={post.id}
                slug={post.slug}
                imageUrl={post.imageUrl}
                category={post.category?.name}
                title={post.title}
                excerpt={post.content.substring(0, 150) + '...'}
                author={post.author.name || 'Anonymous'}
                date={post.createdAt.toLocaleDateString()}
                views={post.views}
                direction='flex-col'
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}