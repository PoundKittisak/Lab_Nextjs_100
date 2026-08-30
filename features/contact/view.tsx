'use client';

import Link from 'next/link';
import { useState } from 'react';

export function ContactFormView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setFeedback('');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) {
      setStatus('error');
      setFeedback('ส่งข้อความไม่สำเร็จ');
      return;
    }

    setStatus('success');
    setFeedback('ส่งข้อความสำเร็จ');
    setName('');
    setEmail('');
    setMessage('');
  }

  const isValid = name.trim().length >= 2 && email.includes('@') && message.trim().length >= 5;

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
      {feedback ? (
        <p className={status === 'success' ? 'text-sm text-green-600' : 'text-sm text-red-600'}>{feedback}</p>
      ) : null}
      <button
        type="submit"
        disabled={!isValid || status === 'sending'}
        className={isValid && status !== 'sending' ? 'rounded bg-blue-600 px-4 py-2 text-white' : 'rounded bg-gray-300 px-4 py-2 text-gray-600'}
      >
        {status === 'sending' ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>
    </form>
  );
}
