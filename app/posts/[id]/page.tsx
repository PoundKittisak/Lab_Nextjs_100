import Link from "next/link";
import type { Metadata } from "next";
import { postsData } from "@/lib/posts";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = postsData.find((item) => item.id === id);

  if (!post) {
    return {
      title: "ไม่พบบทความ",
      description: "ไม่พบบทความที่คุณขอ",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostDetail({ params }: Props) {
  const { id } = await params;
  const post = postsData.find((item) => item.id === id);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-blue-900">ไม่พบบทความ #{id}</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <img src={post.coverImage} alt={post.title} className="h-64 w-full object-cover" />
        <div className="p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{post.category}</span>
            <span>{post.date}</span>
            <span>โดย {post.author}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-blue-900">{post.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{tag}</span>
            ))}
          </div>

          <div className="mt-8 space-y-5 text-lg leading-8 text-gray-700">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Link href="/posts" className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-blue-600">
            ← กลับไปหน้าบล็อก
          </Link>
        </div>
      </div>
    </main>
  );
}
