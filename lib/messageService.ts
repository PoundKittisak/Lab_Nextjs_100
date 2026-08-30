import * as MessageModel from './messages';
import { NotFoundError, ValidationError, ForbiddenError } from './errors';
import { messageSchema } from './schemas';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export async function createMessage(raw: unknown, authorId?: string) {
  let data;
  try {
    data = messageSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.issues[0].message);
    }
    throw err;
  }

  try {
    return await MessageModel.addMessage({
      ...data,
      authorId: authorId ?? undefined,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new ValidationError('อีเมลนี้ถูกใช้แล้ว');
    }
    throw err;
  }
}

export async function listMessages() {
  return MessageModel.getMessages();
}

export async function getMessageById(id: string) {
  const message = await MessageModel.getMessageById(id);
  if (!message) {
    throw new NotFoundError('ไม่พบข้อความนี้');
  }
  return message;
}

export async function editMessage(id: string, updates: Partial<{ message: string }>, sessionUserId?: string) {
  const message = await getMessageById(id);

  if (sessionUserId && message.authorId && message.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขข้อความนี้');
  }

  if (updates.message !== undefined && updates.message.trim() === '') {
    throw new ValidationError('ข้อความห้ามเป็นค่าว่าง');
  }

  try {
    return await MessageModel.updateMessage(id, updates);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new NotFoundError('ไม่พบข้อความนี้');
    }
    throw err;
  }
}

export async function removeMessage(id: string, sessionUserId?: string) {
  const message = await getMessageById(id);

  if (sessionUserId && message.authorId && message.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์ลบข้อความนี้');
  }

  try {
    return await MessageModel.deleteMessage(id);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new NotFoundError('ไม่พบข้อความนี้');
    }
    throw err;
  }
}
