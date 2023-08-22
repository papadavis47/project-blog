import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { compileMDX } from 'next-mdx-remote/rsc';
import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';

async function BlogPost({ params }) {
  // const { frontMatter, content } = await loadBlogPost(params.postSlug);
  const data = await loadBlogPost(params.postSlug);
  const { frontMatter, content } = await compileMDX({
    source: data,
    options: { parseFrontmatter: true },
  });

  console.log(frontMatter);
  console.log(content);
  return (
    <article className={styles.wrapper}>
      <BlogHero title={frontMatter.title} publishedOn={frontMatter.publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
