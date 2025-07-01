import Head from 'next/head';
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts, getFeaturedPost } from '../services';
import { FeaturedPosts } from '../sections';

export default function Home({ posts, featuredPost }) {
  const siteUrl = 'https://crypto-scientia-blog.vercel.app';
  const ogImage = `${siteUrl}/default-og.png`; // update path if needed
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <meta
          name="google-site-verification"
          content="Od61C-SPe_RJOnPqGlVF9jWLDGlXSWApB71vqB3IahQ"
        />
        <link rel="canonical" href="https://crypto-scientia-blog.vercel.app/" />
        <title>PythiaCrypto — Web3 & Crypto Blog</title>
        <meta
          name="description"
          content="Explore blockchain insights, DeFi tutorials, crypto guides, and Web3 development with PythiaCrypto — the blog for decentralized thinkers."
        />
        <meta
          name="keywords"
          content="blockchain, crypto, ethereum, web3, DeFi, smart contracts, NFTs"
        />
        <meta name="author" content="PythiaCrypto" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="PythiaCrypto Blog" />
        <meta
          property="og:description"
          content="Explore the future of decentralized knowledge. Read crypto guides, Web3 tutorials, and blockchain news."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PythiaCrypto — Web3 & Crypto Blog"
        />
        <meta
          name="twitter:description"
          content="Explore the future of decentralized knowledge. Read crypto guides, Web3 tutorials, and blockchain news."
        />
        <meta name="twitter:image" content={ogImage} />

        {/* Schema Markup (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'PythiaCrypto',
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/?s={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </Head>
      <FeaturedPosts featuredPost={featuredPost} />
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
