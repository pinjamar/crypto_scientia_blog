import Head from 'next/head';
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts, getFeaturedPost } from '../services';
import { FeaturedPosts } from '../sections';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CryptoScientia</title>
        {/* <link rel="icon" href="../public/favicon.ico"></link> */}
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
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

export async function getStaticProps() {
  const posts = await getPosts();
  const featuredPost = await getFeaturedPost();

  return {
    props: {
      posts,
      featuredPost,
    },
    revalidate: 60, // Rebuilds the page at most once every 60 seconds
  };
}
