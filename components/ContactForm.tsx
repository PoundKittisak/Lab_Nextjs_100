'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function validate() {
    if (name.trim().length < 2) return 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
    if (!email.includes('@')) return 'อีเมลไม่ถูกต้อง';
    if (message.trim().length < 5) return 'ข้อความสั้นเกินไป';
    return '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = validate();

    if (msg) {
      setError(msg);
      return;
    }

    setError('');
    setStatus('sending');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
  }

  const isValid =
    name.trim().length >= 2 &&
    email.includes('@') &&
    message.trim().length >= 5;

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ชื่อ"
        className="w-full rounded border border-gray-300 p-2"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="อีเมล"
        className="w-full rounded border border-gray-300 p-2"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="ข้อความ"
        className="w-full rounded border border-gray-300 p-2"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {status === 'sending' && <p className="text-gray-400">กําลังส่ง...</p>}
      {status === 'success' && <p className="text-green-600">ส่งสําเร็จ ขอบคุณครับ/ค่ะ!</p>}
      {status === 'error' && <p className="text-red-600">ส่งไม่สําเร็จ ลองใหม่อีกครั้ง</p>}
      <button
        type="submit"
        disabled={!isValid || status === 'sending'}
        className={
          isValid && status !== 'sending'
            ? 'rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'
            : 'rounded bg-gray-300 px-4 py-2 text-gray-600'
        }
      >
        {status === 'sending' ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>
    </form>
  );
}
