import { createTodo, listTodos } from '@/lib/todoService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') ?? undefined;
  const completed = url.searchParams.get('completed') ?? undefined;

  const todos = await listTodos(search, completed);
  return Response.json({ todos });
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = (await request.json()) as {
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
  };

  const item = await createTodo({
    title: body.title ?? '',
    description: body.description,
    priority: body.priority,
  });

  return Response.json({ ok: true, item }, { status: 201 });
});
