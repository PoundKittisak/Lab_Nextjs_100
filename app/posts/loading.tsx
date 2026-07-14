export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-200" />
        {[...Array(5)].map((_: unknown, i: number) => (
          <div key={i} className="mb-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm animate-pulse">
            <div className="mb-2 h-4 w-16 rounded bg-gray-200" />
            <div className="mb-3 h-6 w-3/4 rounded bg-gray-300" />
            <div className="space-y-2">
              <div className="h-3 rounded bg-gray-200" />
              <div className="h-3 w-5/6 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
