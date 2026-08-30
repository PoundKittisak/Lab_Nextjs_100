'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function NavActions() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch('/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/dashboard"
        className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 hover:text-blue-100"
      >
        Dashboard
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 hover:text-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}
