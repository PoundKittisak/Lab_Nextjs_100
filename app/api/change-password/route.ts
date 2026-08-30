import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { changePasswordSchema } from '@/lib/schemas';
import { ValidationError, ForbiddenError, NotFoundError } from '@/lib/errors';
import { ZodError } from 'zod';

export const POST = withErrorHandling(async (request: Request) => {
  // 1. ตรวจสอบการยืนยันตัวตนจาก Cookie Session (Ownership Check)
  const cookieHeader = request.headers.get('cookie') ?? '';
  const sessionMatch = cookieHeader.match(/(?:session|token)=([^;]+)/);
  const sessionUserId = sessionMatch ? sessionMatch[1] : null;

  if (!sessionUserId) {
    throw new ForbiddenError('ต้องเข้าสู่ระบบก่อนเปลี่ยนรหัสผ่าน');
  }

  const rawBody = await request.json();

  // 2. Validate โครงสร้างข้อมูลด้วย Zod (newPassword ต้องยาวอย่างน้อย 8 ตัวอักษร)
  let body;
  try {
    body = changePasswordSchema.parse(rawBody);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.issues[0].message);
    }
    throw err;
  }

  const { oldPassword, newPassword } = body;

  // 3. ค้นหาข้อมูลผู้ใช้ในฐานข้อมูล
  const user = await prisma.user.findUnique({ where: { id: sessionUserId } });
  if (!user) {
    throw new NotFoundError('ไม่พบบัญชีผู้ใช้ในระบบ');
  }

  // 4. ตรวจสอบ oldPassword ด้วย bcrypt.compare ก่อนอนุญาตให้เปลี่ยน
  const isValidOldPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidOldPassword) {
    throw new ValidationError('รหัสผ่านเดิมไม่ถูกต้อง');
  }

  // 5. Hash newPassword ด้วย bcrypt (cost factor 10) แล้วบันทึกลงฐานข้อมูล
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedNewPassword },
  });

  return NextResponse.json({ ok: true, message: 'เปลี่ยนรหัสผ่านสำเร็จเรียบร้อยแล้ว' }, { status: 200 });
});
