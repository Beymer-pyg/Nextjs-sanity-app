"use client";

import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import Posts from "@/app/components/Posts";
import { postsQuery, query, querySlugPosts } from "@/sanity/lib/queries";

/* type Props = {
  posts: Post[];
}; */

export default function PreviewPosts({
  posts = [],
}: {
  posts: SanityDocument[];
  // posts: Props;
}) {
  // const [data] = useLiveQuery(posts, postsQuery);
  const [data] = useLiveQuery(posts, querySlugPosts);

  return <Posts posts={data} />;
}
