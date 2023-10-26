import { SanityDocument } from "@sanity/client";
import { draftMode } from "next/headers";
import Post from "@/app/components/Post";
import {
  postPathsQuery,
  postQuery,
  query,
  querySlugPost,
} from "@/sanity/lib/queries";
import { sanityFetch, token } from "@/sanity/lib/sanityFetch";
import { client } from "@/sanity/lib/client";
import PreviewProvider from "@/app/components/PreviewProvider";
import PreviewPost from "@/app/components/PreviewPost";

export const revalidate = 60; //revalidate this page every 60 seconds
// Prepare Next.js to know which routes already exist

export async function generateStaticParams() {
  // Important, use the plain Sanity Client here
  const posts = await client.fetch(postPathsQuery);

  return posts;
}

export default async function Page({ params }: { params: any }) {
  // const post = await sanityFetch<SanityDocument>({ query: postQuery, params });
  const post = await sanityFetch<SanityDocument>({
    query: querySlugPost,
    params,
  });
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPost post={post} />
      </PreviewProvider>
    );
  }

  return <Post post={post} />;
}
