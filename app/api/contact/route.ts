import { createMessage, listMessages } from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') ?? '';
  const all = await listMessages();
  const filtered = search
    ? all.filter((m) => m.name.includes(search) || m.message.includes(search))
    : all;

  return Response.json({ messages: filtered });
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    message?: string;
  };

  const saved = await createMessage({
    name: body.name ?? '',
    email: body.email ?? '',
    message: body.message ?? '',
  });

  return Response.json({ ok: true, item: saved }, { status: 201 });
});