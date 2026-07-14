import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าแรก",
};

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getRecentPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const posts: Post[] = await getRecentPosts();

  return (
    <main>
      <section className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-blue-900">สวัสดี! 👋</h1>
        <p className="mt-3 text-lg text-gray-700">
          บล็อกของ <span className="font-semibold">กิตติศักดิ์ นวลประจักร์</span> • นิสิตปี 3 CS
        </p>

        <Link
          href="/posts"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          อ่านบทความ →
        </Link>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">บทความล่าสุด</h2>

        <div className="mt-4 grid gap-4">
          {posts.map((post: Post) => (
            <article key={post.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
              <p className="mt-2 text-gray-700">{post.body.slice(0, 80)}...</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
