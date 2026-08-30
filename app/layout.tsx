import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavActions } from "@/components/NavActions";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "%s | My Blog", default: "My Blog" },
  description: "บล็อกส่วนตัว สร้างด้วย Next.js + TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="flex flex-wrap items-center justify-between gap-4 bg-blue-900 px-8 py-4 text-white shadow-lg">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-300">
              📝 My Blog
            </Link>
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/posts" className="transition-colors hover:text-blue-300">
                บทความ
              </Link>
              <Link href="/users" className="transition-colors hover:text-blue-300">
                ผู้ใช้
              </Link>
              <Link href="/contact" className="transition-colors hover:text-blue-300">
                ติดต่อเรา
              </Link>
              <Link href="/about" className="transition-colors hover:text-blue-300">
                เกี่ยวกับ
              </Link>
            </div>
          </div>
          <NavActions />
        </nav>

        <div className="mx-auto max-w-4xl px-4 py-8">{children}</div>

        <footer className="mt-8 border-t py-6 text-center text-sm text-gray-400">
          <p>© 2026 My Blog — สร้างด้วย Next.js + TypeScript</p>
          <p className="mt-1">0214321 Web App Design & Development</p>
        </footer>
      </body>
    </html>
  );
}
