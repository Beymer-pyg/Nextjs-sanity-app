"use client";

import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import HydrationPortText from "./HydrationPortText";
import urlFor from "../lib/urlFor";
import { RichTextComponents } from "./RichTextComponents";

const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#F7AB0A] text-white mb-5">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            {post?.mainImage ? (
              <Image
                className="object-cover object-center mx-auto "
                src={urlFor(post.mainImage).url()}
                alt={post.mainImage.alt}
                fill
              />
            ) : null}
          </div>

          <section className="p-5 bg-[#F7AB0A] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div>
                {post?.title ? (
                  <h1 className="text-4xl font-extrabold">{post.title}</h1>
                ) : null}
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {post?.author ? (
                  <Image
                    className="rounded-full"
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    height={40}
                    width={40}
                  />
                ) : null}

                <div className="w-64">
                  {post?.author ? (
                    <h3 className="text-lg font-bold">{post.author.name}</h3>
                  ) : null}

                  <div>{/* TODO Author BIO */}</div>
                </div>
              </div>
            </div>

            <div>
              {post?.description ? (
                <h2 className="italic pt-10">{post.description}</h2>
              ) : null}

              {post?.categories ? (
                <div className="flex items-center justify-end mt-auto space-x-2">
                  {post.categories.map((category: any) => (
                    <p
                      key={category._id}
                      className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                    >
                      {category.title}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </section>

      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
}
