import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';
import { BLOG_TITLE } from '@/constants';
import dynamic from 'next/dynamic';
import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);
  return {
    title: `${frontmatter.title} - ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}
const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'));

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero title={frontmatter.title} publishedOn={frontmatter.publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ pre: CodeSnippet, DivisionGroupsDemo }} />
      </div>
    </article>
  );
}

export default BlogPost;
