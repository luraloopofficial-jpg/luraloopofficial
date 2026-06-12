import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

// --- Types ---
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  publishedAt?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
}

// --- Queries ---
const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id, title, slug, mainImage, publishedAt, excerpt, body
}`;

const SLUGS_QUERY = `*[_type == "blogPost"]{ "slug": slug.current }`;

// --- Static Params for ISR ---
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

// --- Dynamic OG Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: Post = await client.fetch(POST_QUERY, { slug });
  if (!post) return { title: "Post Not Found" };

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${post.title} | LuraLoop Blog`,
    description: post.excerpt || "Read this article on the LuraLoop Blog.",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      url: `https://luraloopofficial.vercel.app/blog/${slug}`,
    },
  };
}

// --- Portable Text Rendering Components ---
const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold text-brand-white mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-bold text-brand-white mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-brand-orange pl-6 py-2 my-6 text-brand-gray italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-brand-gray leading-relaxed mb-5">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-brand-white font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="text-brand-gray/90 italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-white/10 text-brand-orange px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => {
      const src = urlFor(value).width(1200).url();
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <Image src={src} alt={value.alt || ""} fill className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-brand-gray mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// --- Page Component ---
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post = await client.fetch(POST_QUERY, { slug });

  if (!post) notFound();

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1400).height(700).url()
    : null;

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Draft";

  return (
    <article className="min-h-screen relative z-10">
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative w-full h-[50vh] max-h-[500px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/40 to-brand-black" />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-orange transition-colors text-sm mb-10"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Meta */}
        <div className="mb-8">
          <span className="text-xs text-brand-orange font-semibold uppercase tracking-widest">
            {date}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-white mt-3 mb-5 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-brand-gray leading-relaxed border-l-4 border-brand-orange/40 pl-5">
              {post.excerpt}
            </p>
          )}
        </div>

        <hr className="border-white/10 mb-10" />

        {/* Body */}
        {post.body && (
          <div className="prose-custom">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-brand-orange/20 text-center">
          <h3 className="text-xl font-bold text-brand-white mb-3">
            Want to see LuraLoop in action?
          </h3>
          <p className="text-brand-gray mb-6">
            Book a personalised demo and see how Ziya can transform your
            operations.
          </p>
          <Link
            href="#contact"
            className="px-6 py-3 bg-brand-orange text-brand-black font-semibold rounded-xl hover:bg-[#ff8022] transition-colors"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </article>
  );
}
