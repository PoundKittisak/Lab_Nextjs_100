import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { ForbiddenError, ValidationError } from '@/lib/errors';

export const POST = withErrorHandling(async (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const match = cookieHeader.match(/(?:session|token)=([^;]+)/);
  const userId = match ? match[1] : null;

  if (!userId) {
    throw new ForbiddenError('ต้องเข้าสู่ระบบก่อนกด React อีโมจิ');
  }

  const { commentId, emoji } = await request.json();

  if (!commentId || !emoji) {
    throw new ValidationError('โปรดระบุ commentId และ emoji');
  }

  const validEmojis = ['👍', '❤️', '🔥', '🎉'];
  if (!validEmojis.includes(emoji)) {
    throw new ValidationError('รองรับเฉพาะอีโมจิ 👍, ❤️, 🔥, 🎉 เท่านั้น');
  }

  const reaction = await prisma.commentReaction.create({
    data: {
      commentId,
      emoji,
      userId,
    },
  });

  return NextResponse.json({ ok: true, reaction }, { status: 201 });
});

export const GET = withErrorHandling(async (request: Request) => {
  const url = new URL(request.url);
  const commentId = url.searchParams.get('commentId');

  if (!commentId) {
    throw new ValidationError('โปรดระบุ commentId');
  }

  const reactions = await prisma.commentReaction.findMany({
    where: { commentId },
  });

  // สรุปนับจำนวนไอคอนอีโมจิแต่ละตัว (Aggregate reaction counts)
  const counts = reactions.reduce((acc, curr) => {
    acc[curr.emoji] = (acc[curr.emoji] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return NextResponse.json({ commentId, reactions, counts }, { status: 200 });
});
