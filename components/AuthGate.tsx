'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(true);

  async function handleLogout() {
    await fetch('/logout', { method: 'POST' });
    setLoggedIn(false);
    router.push('/login');
  }

  if (!loggedIn) {
    return (
      <div className="space-y-3 p-4">
        <p className="text-red-600">คุณยังไม่ได้เข้าสู่ระบบ</p>
        <Link href="/login" className="inline-block rounded bg-blue-600 px-4 py-2 text-white">
          ไปหน้า Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {children}
    </div>
  );
}
