import Link from "next/link";
import type { Metadata } from "next";
import previewImage from "../image/preview.png";
import { fetchExternal } from "../lib/external";
import { postsData } from "../lib/posts";

export const metadata: Metadata = {
  title: "หน้าแรก",
};

export default async function Home() {
  const products = await fetchExternal("products");
  const news = await fetchExternal("news");

  return (
    <main className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-blue-100 bg-linear-to-br from-blue-900 via-blue-800 to-cyan-600 p-8 text-white shadow-xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">My Personal Profile</p>
            <h1 className="text-4xl font-bold sm:text-5xl">Kittisak Nouanprachak</h1>
            <p className="mt-4 text-lg text-blue-50">ชื่อเล่น: ปอน | รหัสนิสิต: 6720210100 | นักศึกษาวิชา WEB APPLICATION DESIGN</p>
            <p className="mt-3 max-w-2xl text-base text-blue-100">
              พัฒนาทักษะการสร้างเว็บแอปและการเรียนรู้ TypeScript อย่างลึกซึ้ง
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/courses" className="rounded-full bg-white px-5 py-2.5 font-semibold text-blue-800 transition hover:bg-blue-50">
                ดูรายวิชา
              </Link>
              <Link href="/posts" className="rounded-full border border-white/40 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10">
                อ่าน Blog
              </Link>
              <Link href="/dashboard" className="rounded-full border border-white/40 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div className="h-48 overflow-hidden rounded-2xl bg-linear-to-br from-white/20 to-transparent">
              <img
                src={previewImage.src}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 space-y-2 text-sm text-blue-50">
              <p><span className="font-semibold text-white">คติประจำใจ:</span> "Done is better than perfect."</p>
              <p><span className="font-semibold text-white">Idol:</span> Elon Musk</p>
              <p><span className="font-semibold text-white">งานอดิเรก:</span> เล่นเกม, ฟังเพลง, ดูซีรีส์</p>
      
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">บทความล่าสุด</h2>
          <div className="mt-5 space-y-4">
            {postsData.slice(0, 3).map((post) => (
              <article key={post.id} className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
                <p className="text-sm font-medium text-blue-600">{post.category}</p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">สิ่งที่น่าสนใจ</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="font-semibold text-blue-800">Favorite Movie</p>
              <p className="text-sm text-blue-700">Spider Man Brand New Day</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="font-semibold text-amber-800">Favorite Sport</p>
              <p className="text-sm text-amber-700">บาสเกตบอล</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-4">
              <p className="font-semibold text-green-800">Collection</p>
              <p className="text-sm text-green-700">ฟิกเกอร์</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">สินค้าแนะนำ</h2>
          <div className="mt-4 space-y-3">
            {products.map((product) => (
              <article key={product.id} className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
                {product.image ? (
                  <img src={product.image} alt={product.title} className="h-14 w-14 rounded object-cover" />
                ) : null}
                <div>
                  <h3 className="font-medium text-gray-900">{product.title}</h3>
                  {product.subtitle ? <p className="text-sm text-gray-600">{product.subtitle}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">ข่าวล่าสุดจาก Hacker News</h2>
          <div className="mt-4 space-y-3">
            {news.map((item) => (
              <article key={item.id} className="rounded-2xl border border-gray-100 p-3">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                {item.subtitle ? <p className="mt-1 text-sm text-gray-600">{item.subtitle}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
