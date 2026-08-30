import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail } from '@/lib/users';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await findUserByEmail(email);

  const isValid = user && (await bcrypt.compare(password, user.password));

  if (!isValid) {
    return NextResponse.json({ error: 'อีเมล/รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  }

  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'ต้องล็อกอินด้วยบัญชี admin เท่านั้น' }, { status: 403 });
  }

  const res = NextResponse.json({ ok: true }, { status: 200 });
  const tokenValue = user.id;

  res.cookies.set('token', tokenValue, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  });

  res.cookies.set('session', tokenValue, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  });

  return res;
}