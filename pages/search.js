import Head from 'next/head';
import { useRouter } from 'next/router';
import { PostCard, Categories, PostWidget } from '../components';
import { searchPosts } from '../services';

export default function SearchPage({ searchResults, query }) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Search Results for {query} — PythiaCrypto</title>
      </Head>

      <div className="mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newQuery = e.target.search.value.trim();
            if (newQuery.length > 1) {
              router.push(`/search?q=${encodeURIComponent(newQuery)}`);
            }
          }}
        >
          <input
            type="text"
            name="search"
            defaultValue={query}
            placeholder="🔍 Search blog posts..."
            className="w-full max-w-lg p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {searchResults.length > 0 ? (
            searchResults.map((post) => (
              <PostCard post={post} key={post.title} />
            ))
          ) : (
            <p>No posts found for {query}.</p>
          )}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const query = context.query.q || '';

  if (!query || query.trim().length < 2) {
    return {
      props: {
        searchResults: [],
        query: '',
      },
    };
  }

  const searchResults = await searchPosts(query.trim());

  return {
    props: {
      searchResults,
      query: query.trim(),
    },
  };
}
