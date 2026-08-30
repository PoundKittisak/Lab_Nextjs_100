import type { NextRequest } from 'next/server';
import { addAggregatorNote, getAggregatorNotes } from '@/lib/notes';
import { findUserById } from '@/lib/users';

async function isAdminAuthenticated(request: NextRequest) {
  const tokenFromCookie = request.cookies.get('token')?.value;
  const sessionFromCookie = request.cookies.get('session')?.value;
  const token = tokenFromCookie || sessionFromCookie;

  if (!token) return false;

  const user = await findUserById(token);
  return Boolean(user && user.role === 'admin');
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated(request))) {
    return Response.json({ error: 'ต้องเข้าสู่ระบบด้วยบัญชี admin ก่อน' }, { status: 401 });
  }

  const notes = getAggregatorNotes();
  return Response.json({ notes }, { status: 200 });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated(request))) {
    return Response.json({ error: 'ต้องเข้าสู่ระบบด้วยบัญชี admin ก่อน' }, { status: 401 });
  }

  const body = (await request.json()) as {
    itemId?: string;
    itemTitle?: string;
    note?: string;
  };

  if (!body.itemId?.trim()) {
    return Response.json({ error: 'โปรดเลือกหรือระบุไอเทมจาก Blog Aggregator' }, { status: 400 });
  }

  if (!body.itemTitle?.trim() || body.itemTitle.trim().length < 3) {
    return Response.json({ error: 'ชื่อไอเทมต้องมีอย่างน้อย 3 ตัวอักษร' }, { status: 400 });
  }

  const noteText = body.note?.trim() ?? '';
  if (noteText.length < 10) {
    return Response.json({ error: 'ข้อความต้องยาวอย่างน้อย 10 ตัวอักษร' }, { status: 400 });
  }

  const item = addAggregatorNote({
    itemId: body.itemId.trim(),
    itemTitle: body.itemTitle.trim(),
    note: noteText,
  });

  return Response.json({ ok: true, item }, { status: 201 });
}
