import { SanityDocument } from "next-sanity";
import Posts from "@/app/components/Posts";
import { postsQuery, query, querySlugPosts } from "@/sanity/lib/queries";
import { sanityFetch, token } from "@/sanity/lib/sanityFetch";
import { draftMode } from "next/headers";
import PreviewPosts from "@/app/components/PreviewPosts";
import PreviewProvider from "@/app/components/PreviewProvider";

/* type Props = {
  posts: Post[];
}; */

export default async function Home() {
  // const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  // const posts = await sanityFetch<SanityDocument[]>({ query: query });
  const posts = await sanityFetch<SanityDocument[]>({ query: querySlugPosts });
  // const posts = await sanityFetch<Props>({ query: postsQuery });
  const isDraftMode = draftMode().isEnabled;
  // const { isEnabled } = draftMode();

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <h1>hola</h1>
        <PreviewPosts posts={posts} />
      </PreviewProvider>
    );
  }
  return <Posts posts={posts} />;
}
