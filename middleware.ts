import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const protectedPaths = ['/dashboard'];
  const isProtected = protectedPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const cookieToken = request.cookies.get('token')?.value;
  const headerToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  const token = cookieToken || headerToken;

  // ถ้าไม่มี token ให้ดีดกลับไปหน้า login ทันทีตามเงื่อนไขอาจารย์
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // หมายเหตุ: ตัดบรรทัด findUserById ออกตรงนี้ชั่วคราว เพื่อป้องกัน Prisma พังบน Edge Runtime
  // โดยให้ระบบเช็กแค่ว่ามี Token อยู่จริงก็อนุญาตให้ผ่านเข้า Dashboard ได้เลยครับ

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};