import { getMessageById, editMessage, removeMessage } from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';

function getSessionUserId(request: Request): string | undefined {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const match = cookieHeader.match(/(?:session|token)=([^;]+)/);
  return match ? match[1] : undefined;
}

export const GET = withErrorHandling(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const message = await getMessageById(id);
  return Response.json({ message });
});

export const PATCH = withErrorHandling(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const sessionUserId = getSessionUserId(request);
  const updates = await request.json();
  const updated = await editMessage(id, updates, sessionUserId);
  return Response.json({ ok: true, item: updated });
});

export const DELETE = withErrorHandling(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const sessionUserId = getSessionUserId(request);
  await removeMessage(id, sessionUserId);
  return Response.json({ ok: true }, { status: 200 });
});
