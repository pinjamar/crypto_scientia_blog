/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import moment from 'moment';

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj && obj.children) {
      modifiedText = obj.children.map((child, i) =>
        getContentFragment(i, child.text || '', child, child.type)
      );
    }
    if (obj) {
      if (obj.bold) modifiedText = <b>{modifiedText}</b>;
      if (obj.italic) modifiedText = <em>{modifiedText}</em>;
      if (obj.underline) modifiedText = <u>{modifiedText}</u>;
    }
    switch (type) {
      // Headings
      case 'heading-one':
        return (
          <h1 key={index} className="text-4xl font-bold mb-6">
            {modifiedText}
          </h1>
        );
      case 'heading-two':
        return (
          <h2 key={index} className="text-3xl font-bold mb-5">
            {modifiedText}
          </h2>
        );
      case 'heading-three':
        return (
          <h3 key={index} className="text-2xl font-semibold mb-4">
            {modifiedText}
          </h3>
        );
      case 'heading-four':
        return (
          <h4 key={index} className="text-xl font-semibold mb-3">
            {modifiedText}
          </h4>
        );
      case 'heading-five':
        return (
          <h5 key={index} className="text-lg font-semibold mb-2">
            {modifiedText}
          </h5>
        );
      case 'heading-six':
        return (
          <h6 key={index} className="text-base font-semibold mb-2">
            {modifiedText}
          </h6>
        );
      // Paragraph
      case 'paragraph':
        return (
          <p key={index} className="mb-6">
            {modifiedText}
          </p>
        );
      // Lists
      case 'bulleted-list':
        return (
          <ul key={index} className="list-disc list-inside pl-6 mb-6">
            {modifiedText}
          </ul>
        );
      case 'numbered-list':
        return (
          <ol key={index} className="list-decimal list-inside pl-6 mb-6">
            {modifiedText}
          </ol>
        );
      // Handle nested list structure
      case 'list-item':
      case 'list-item-child':
        // Render only leaf-level list-item-child as <li>
        const isLeaf = !obj.children?.some(
          (child) =>
            child.type === 'list-item' || child.type === 'list-item-child'
        );
        return isLeaf ? (
          <li key={index} className="mb-2">
            {modifiedText}
          </li>
        ) : (
          <React.Fragment key={index}>{modifiedText}</React.Fragment>
        );
      // Table
      case 'table':
        return (
          <div className="overflow-x-auto w-full">
            <table
              key={index}
              className="table-auto border border-gray-300 w-full mb-6 min-w-[700px]"
            >
              <tbody>{modifiedText}</tbody>
            </table>
          </div>
        );
      case 'table_row':
        return <tr key={index}>{modifiedText}</tr>;
      case 'table_cell':
        return (
          <td key={index} className="border px-4 py-2">
            {modifiedText}
          </td>
        );
      case 'table_header_cell':
        return (
          <th
            key={index}
            className="border px-4 py-2 font-semibold text-left bg-gray-100"
          >
            {modifiedText}
          </th>
        );
      // Links
      case 'link':
        return (
          <a
            key={index}
            href={obj.href}
            target={obj.openInNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {modifiedText}
          </a>
        );
      // Images
      case 'image':
        return (
          <div key={index} className="w-full my-6 flex justify-center">
            <img
              src={obj.src}
              alt={obj.title || ''}
              className="rounded-lg max-w-full h-auto object-contain shadow"
              loading="lazy"
            />
          </div>
        );
      default:
        return <React.Fragment key={index}>{modifiedText}</React.Fragment>;
    }
  };
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 px-0">
        <div className="relative overflow-hidden shadow-md mb-6 flex justify-center">
          <div className="relative w-full max-w-[1200px] aspect-[4/3] sm:aspect-[16/9]">
            <Image
              src={`${post.featuredImage.url}?width=1200&fit=clip`}
              alt={post.title}
              fill
              className="rounded-md object-cover"
              priority
            />
          </div>
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full justify-center">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
              <img
                alt={post.author.name}
                height={30}
                width={30}
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                {post.author.name}
              </p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </span>
            </div>
          </div>
          <h1 className="mb-8 md:text-4xl font-bold flex justify-center">
            {post.title}
          </h1>
          {post.content.raw.children.map((node, index) =>
            getContentFragment(index, '', node, node.type)
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
