export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const messages: ContactMessage[] = [];

export function addContactMessage(data: Omit<ContactMessage, 'id' | 'createdAt'>): ContactMessage {
  const item: ContactMessage = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  messages.push(item);
  return item;
}

export function getContactMessages(): ContactMessage[] {
  return messages;
}
