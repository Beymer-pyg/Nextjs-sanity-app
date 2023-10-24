"use client";

import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import Posts from "@/app/components/Posts";
import { postsQuery, query } from "@/sanity/lib/queries";

type Props = {
  posts: Post[];
};

export default function PreviewPosts({
  posts = [],
}: // posts,
{
  posts: SanityDocument[];
  // posts: Props;
}) {
  // const verData = useLiveQuery(posts, postsQuery);
  // console.log("verData", verData);
  // const [data] = useLiveQuery(posts, postsQuery);
  const [data] = useLiveQuery(posts, query);
  console.log("data", data);

  return <Posts posts={data} />;
}
