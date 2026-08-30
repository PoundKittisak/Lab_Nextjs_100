import Link from "next/link";
import type { Metadata } from "next";
import { postsData } from "@/lib/posts";

export const metadata: Metadata = {
  title: "บทความทั้งหมด",
  description: "รวมบทความทั้งหมดในบล็อก",
};

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Blog & Insights</p>
          <h1 className="text-4xl font-bold text-blue-900">บล็อกของฉัน</h1>
          <p className="mt-3 text-slate-600">บทความเล็ก ๆ ที่สะท้อนความคิดและประสบการณ์ในการเรียนและพัฒนาเว็บ</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {postsData.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <img src={post.coverImage} alt={post.title} className="h-40 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-slate-800">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700">{tag}</span>
                  ))}
                </div>
                <Link href={`/posts/${post.id}`} className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
                  อ่านต่อ
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
