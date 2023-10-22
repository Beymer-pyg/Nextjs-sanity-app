"use client";

import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import Posts from "@/app/components/Posts";
import { postsQuery } from "@/sanity/lib/queries";

export default function PreviewPosts({
  posts = [],
}: {
  posts: SanityDocument[];
}) {
  // const verData = useLiveQuery(posts, postsQuery);
  // console.log("verData", verData);
  const [data] = useLiveQuery(posts, postsQuery);

  return <Posts posts={data} />;
}
