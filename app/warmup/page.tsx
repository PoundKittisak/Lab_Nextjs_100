'use client';

import { useState } from 'react';

export default function WarmupPage() {
  const [text, setText] = useState('');

  return (
    <div className="p-8">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full max-w-md rounded border border-gray-300 px-3 py-2"
        placeholder="พิมพ์ข้อความ"
      />
      <p className="mt-4">พิมพ์ว่า: {text}</p>
    </div>
  );
}
