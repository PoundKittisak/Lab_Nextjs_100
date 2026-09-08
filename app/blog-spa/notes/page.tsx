'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { AggregatorNote } from '@/lib/notes';

function NotesFormContent() {
  const searchParams = useSearchParams();
  const [itemId, setItemId] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [savedNotes, setSavedNotes] = useState<AggregatorNote[]>([]);

  useEffect(() => {
    setItemId(searchParams.get('itemId') ?? '');
    setItemTitle(searchParams.get('itemTitle') ?? '');
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {
        if (data.notes) {
          setSavedNotes(data.notes);
        }
      })
      .catch(() => {
        setSavedNotes([]);
      });
  }, []);

  const isItemValid = itemId.trim().length > 0;
  const isTitleValid = itemTitle.trim().length >= 3;
  const isNoteValid = note.trim().length >= 10;
  const canSubmit = isItemValid && isTitleValid && isNoteValid && status !== 'sending';

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus('sending');
    setFeedback('');

    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, itemTitle, note }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      setStatus('error');
      setFeedback(data.error || 'เกิดข้อผิดพลาดในการบันทึก');
      return;
    }

    setStatus('success');
    setFeedback('บันทึกโน้ตเรียบร้อยแล้ว');
    setSavedNotes((current) => [data.item, ...current]);
    setNote('');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">บันทึกโน้ต Blog Aggregator</h1>
          <p className="mt-2 text-gray-600">ฟีเจอร์นี้สามารถบันทึกโน้ตสำหรับรายการที่ดึงมาจาก Blog Aggregator ได้เฉพาะผู้ที่ล็อกอินเท่านั้น</p>
        </div>
        <Link href="/blog-spa" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
          กลับไปยัง Aggregator
        </Link>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Item ID</label>
            <input
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              placeholder="ใส่รหัสไอเทมจาก Aggregator"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
            <p className="mt-1 text-xs text-gray-500">ต้องไม่ว่าง</p>
            {!isItemValid && itemId !== '' ? <p className="text-xs text-red-600">กรุณาระบุรหัสไอเทม</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">ชื่อบทความ/รายการ</label>
            <input
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              placeholder="ชื่อบทความหรือชื่อรายการ"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
            {!isTitleValid && itemTitle !== '' ? <p className="text-xs text-red-600">ชื่อไอเทมต้องอย่างน้อย 3 ตัวอักษร</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">โน้ต</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="เขียนโน้ตเกี่ยวกับบทความหรือรายการนี้"
              className="w-full min-h-35 rounded border border-gray-300 px-3 py-2"
            />
            <p className="mt-1 text-xs text-gray-500">ต้องมีอย่างน้อย 10 ตัวอักษร</p>
            {!isNoteValid && note !== '' ? <p className="text-xs text-red-600">ข้อความต้องมีอย่างน้อย 10 ตัวอักษร</p> : null}
          </div>

          {feedback ? (
            <p className={status === 'success' ? 'text-sm text-green-600' : 'text-sm text-red-600'}>{feedback}</p>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
              canSubmit ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {status === 'sending' ? 'กำลังบันทึก...' : 'บันทึกโน้ต'}
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">โน้ตที่บันทึกไว้</h2>
        {savedNotes.length === 0 ? (
          <p className="mt-4 text-gray-600">ยังไม่มีโน้ตที่บันทึกไว้</p>
        ) : (
          <div className="mt-4 space-y-4">
            {savedNotes.map((saved) => (
              <div key={saved.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-gray-900">{saved.itemTitle}</p>
                  <span className="text-xs text-gray-500">{new Date(saved.createdAt).toLocaleString('th-TH')}</span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{saved.note}</p>
                <p className="mt-3 text-xs text-gray-500">Item ID: {saved.itemId}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogSpaNotesPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลด...</div>}>
        <NotesFormContent />
      </Suspense>
    </main>
  );
}
