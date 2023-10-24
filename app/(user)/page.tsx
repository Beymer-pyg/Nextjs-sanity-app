import { SanityDocument } from "next-sanity";
import Posts from "@/app/components/Posts";
import { postsQuery, query } from "@/sanity/lib/queries";
import { sanityFetch, token } from "@/sanity/lib/sanityFetch";
import { draftMode } from "next/headers";
import PreviewPosts from "@/app/components/PreviewPosts";
import PreviewProvider from "@/app/components/PreviewProvider";

/* type Props = {
  posts: Post[];
}; */

export default async function Home() {
  // const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  const posts = await sanityFetch<SanityDocument[]>({ query: query });
  // const posts = await sanityFetch<Props>({ query: postsQuery });
  const isDraftMode = draftMode().isEnabled;
  const { isEnabled } = draftMode();

  // console.log(posts);

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <main>
          <h1>My blog Post</h1>
          <p>Draft Mode is currently {isEnabled ? "Enabled" : "Disabled"}</p>
        </main>
        <PreviewPosts posts={posts} />
      </PreviewProvider>
    );
  }
  return <Posts posts={posts} />;
}
