import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "บทความทั้งหมด",
  description: "รวมบทความทั้งหมดในบล็อก",
};

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default async function PostsPage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");

  const posts: Post[] = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 p-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-900">📝 บทความทั้งหมด ({posts.length})</h1>

        <div className="mt-6 grid gap-4">
          {posts.map((post: Post) => (
            <article key={post.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">#{post.id}</p>
              <h2 className="mt-2 text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="mt-3 text-gray-700">{post.body.slice(0, 120)}...</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
