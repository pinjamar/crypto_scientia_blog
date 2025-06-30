import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Loader,
} from '../../components';
import { getPosts, getPostDetails } from '../../services';

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const siteUrl = 'https://crypto-scientia-blog.vercel.app';
  const postUrl = `${siteUrl}/post/${post.slug}`;
  const ogImage = post.ogImage?.url || '/default-og.png';
  return (
    <>
      <Head>
        <title>{post.seoTitle || post.title}</title>
        <meta
          name="description"
          content={post.seoDescription || post.excerpt || ''}
        />
        {post.keywords && <meta name="keywords" content={post.keywords} />}

        {/* Open Graph */}
        <meta property="og:title" content={post.seoTitle || post.title} />
        <meta
          property="og:description"
          content={post.seoDescription || post.excerpt || ''}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoTitle || post.title} />
        <meta
          name="twitter:description"
          content={post.seoDescription || post.excerpt || ''}
        />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <div className="container mx-auto px-2 md:px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
