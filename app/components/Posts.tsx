import Link from "next/link";
import type { SanityDocument } from "@sanity/client";
import Image from "next/image";
import urlFor from "../lib/urlFor";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { PortableText } from "@portabletext/react";
import ClientSideRoute from "./ClientSideRoute";

/* type Props = {
  posts: Post[];
}; */

export default function Posts({ posts = [] }: { posts: SanityDocument[] }) {
  // export default function Posts({ posts }: Props) {
  const title =
    posts.length === 1 ? `1 Post Today` : `${posts.length} Posts Today OK`;
  // divide-y divide-red-600 para que el padre agregue una linea divisoria a los hijos
  return (
    <div>
      <h1 className="text-2xl p-4 font-bold">{title}</h1>
      <hr className="border-[#F7AB0A] mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gap-y-16 pb-24">
        {/* Posts */}
        {posts.map((post) => (
          <ClientSideRoute key={post._id} route={`post/${post.slug.current}`}>
            <div className="flex flex-col group cursor-pointer">
              {/* <Link
              key={post._id}
              href={`post/${post.slug.current}`}
              className="p-4 hover:bg-blue-50"
            > */}
              <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                {post?.mainImage ? (
                  <Image
                    className="object-cover object-left lg:object-center"
                    src={urlFor(post.mainImage).url()}
                    alt={post.author.name}
                    fill
                  />
                ) : null}
                <div className="absolute bottom-0 w-full  bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between">
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p>
                      {new Date(post._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                    {post.categories.map((category: any) => (
                      <div
                        key={category._id}
                        className="bg-[#F7AB0A] text-center text-black px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex-1">
                <p className="line-clamp-2 underline text-lg font-bold">
                  {post.title}
                </p>

                <p className="line-clamp-3 text-gray-500">{post.description}</p>
              </div>

              <p className="mt-5 font-bold flex items-center group-hover:underline">
                Read Post
                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
              </p>
              {/* </Link> */}
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
}
