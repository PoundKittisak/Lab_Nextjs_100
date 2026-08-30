'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  // ฟังก์ชันโหลดข้อความ
  async function loadMessages() {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setMessages([]);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  // ฟังก์ชันสำหรับลบข้อความ
  const handleDelete = async (id: string) => {
    if (!confirm('คุณต้องการลบข้อความนี้ใช่หรือไม่?')) return;

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // กรองข้อมูลที่ถูกลบออก, อัปเดตหน้าจอทันที
        setMessages(messages.filter((item) => item.id !== id));
      } else {
        alert('ลบข้อมูลไม่สำเร็จ');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mb-6 text-gray-600">จำนวนข้อความที่ได้รับ: {messages.length}</p>

        {messages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-600">
            ยังไม่มีข้อความจากหน้าติดต่อ กรุณาส่งข้อความจากหน้าติดต่อเพื่อดูที่นี่
          </div>
        ) : (
          <ul className="space-y-4">
            {messages.map((item) => (
              <li key={item.id} className="rounded-lg border border-gray-200 bg-slate-50 p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  {item.createdAt ? (
                    <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString('th-TH')}</p>
                  ) : null}
                </div>
                <p className="text-sm text-gray-600">{item.email}</p>
                <p className="mt-3 whitespace-pre-line text-gray-700">{item.message}</p>

                {/* ส่วนเพิ่มปุ่ม แก้ไข และ ลบ ข้อมูล */}
                <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-200 pt-3">
                  <Link
                    href={`/dashboard/edit/${item.id}`}
                    className="rounded bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-100"
                  >
                    แก้ไข
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                  >
                    ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}