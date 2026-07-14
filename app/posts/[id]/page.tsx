import type { Metadata, ResolvingMetadata } from "next";

interface Post {
  id: number;
  title: string;
  body: string;
}

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return {
    title: post.title,
    description: post.body.slice(0, 160),
  };
}

export default async function PostDetail({ params }: Props) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main className="min-h-screen bg-gray-50 p-12">
        <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-blue-900">ไม่พบบทความ #{params.id}</h1>
        </div>
      </main>
    );
  }

  const post: Post = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 p-12">
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          บทความ #{post.id}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-blue-900">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-gray-700">{post.body}</p>
      </div>
    </main>
  );
}
