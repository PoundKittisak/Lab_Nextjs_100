import { listMessages, createMessage } from '@/lib/messageService';

// GET: ดึงรายการข้อความทั้งหมด
export async function GET() {
  return Response.json(listMessages());
}

// POST: สร้างข้อความใหม่
export async function POST(request: Request) {
  const body = await request.json();
  const newMessage = createMessage(body);
  return Response.json(newMessage, { status: 201 });
}