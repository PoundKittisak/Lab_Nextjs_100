import { addContactMessage, getContactMessages } from './model';

export async function submitContactMessage(input: { name: string; email: string; message: string }) {
  if (!input.name?.trim() || !input.email?.trim() || !input.message?.trim()) {
    return { ok: false, error: 'ข้อมูลไม่ครบ' };
  }

  const item = addContactMessage({
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  });

  return { ok: true, item };
}

export async function listContactMessages() {
  return getContactMessages();
}
