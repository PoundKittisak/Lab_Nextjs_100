'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@tsu.ac.th');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'เข้าสู่ระบบไม่สำเร็จ');
        return;
      }

      setSuccess('ล็อกอินสำเร็จแล้ว กำลังไปยังหน้า Dashboard...');
      window.location.assign('/dashboard');
      return;
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="w-full space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← ย้อนกลับ
        </button>
        <h1 className="text-2xl font-semibold">เข้าสู่ระบบ admin</h1>
        <p className="text-sm text-gray-500">ใช้บัญชี admin เท่านั้นเพื่อเข้าถึงหน้า Dashboard</p>
        <p className="text-sm text-gray-500">Email: admin@tsu.ac.th / Password: 1234</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="อีเมล admin"
          className="w-full rounded border border-gray-300 px-3 py-2"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="รหัสผ่าน admin"
          className="w-full rounded border border-gray-300 px-3 py-2"
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded px-4 py-2 font-semibold text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </main>
  );
}
