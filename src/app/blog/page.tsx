import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Blog | LuraLoop",
  description:
    "Insights, case studies, and updates from LuraLoop — the Enterprise AI Automation company.",
  openGraph: {
    title: "LuraLoop Blog",
    description:
      "Insights, case studies, and updates from LuraLoop — the Enterprise AI Automation company.",
    url: "https://luraloopofficial.vercel.app/blog",
  },
};

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  publishedAt?: string;
  excerpt?: string;
}

const POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, mainImage, publishedAt, excerpt
}`;

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(POSTS_QUERY);

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-medium mb-6">
          LuraLoop Insights
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-brand-white">
          The <span className="text-brand-orange">Blog</span>
        </h1>
        <p className="text-lg text-brand-gray max-w-2xl mx-auto">
          AI automation insights, case studies, and product updates from the
          LuraLoop team.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-6">✍️</div>
            <h2 className="text-2xl font-bold text-brand-white mb-3">
              No posts yet
            </h2>
            <p className="text-brand-gray mb-8">
              Head over to the Studio and publish your first article.
            </p>
            <Link
              href="/studio"
              className="px-6 py-3 bg-brand-orange text-brand-black font-semibold rounded-xl hover:bg-[#ff8022] transition-colors"
            >
              Open Studio →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const imageUrl = post.mainImage
                ? urlFor(post.mainImage).width(800).height(450).url()
                : null;
              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Draft";

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col rounded-3xl bg-white/5 border border-white/10 hover:border-brand-orange/50 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,107,0,0.1)]"
                >
                  {/* Cover Image */}
                  <div className="relative w-full h-52 bg-brand-black/60 overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.mainImage?.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl opacity-20">📝</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <span className="text-xs text-brand-orange font-semibold uppercase tracking-widest mb-3">
                      {date}
                    </span>
                    <h2 className="text-xl font-bold text-brand-white mb-3 leading-snug group-hover:text-brand-orange transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-brand-gray leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-5 flex items-center gap-2 text-brand-orange text-sm font-semibold">
                      Read article
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
