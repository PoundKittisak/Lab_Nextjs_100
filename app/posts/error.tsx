'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <main className="min-h-screen bg-gray-50 p-12">
      <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-white p-8 shadow-sm">
        <p className="text-lg font-semibold text-red-600">❌</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">เกิดข้อผิดพลาด!</h2>
        <p className="mt-3 text-gray-700">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-red-500 px-6 py-2 font-semibold text-white transition hover:bg-red-600"
        >
          ลองอีกครั้ง
        </button>
      </div>
    </main>
  );
}
