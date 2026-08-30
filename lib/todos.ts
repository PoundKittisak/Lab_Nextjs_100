import { prisma } from './prisma';

export async function addTodo(data: {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: string;
}) {
  return prisma.todo.create({
    data: {
      title: data.title,
      description: data.description ?? '',
      completed: data.completed ?? false,
      priority: data.priority ?? 'medium',
    },
  });
}

export async function getTodos() {
  return prisma.todo.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: 'desc' },
  });
}

export async function findTodoById(id: string) {
  return prisma.todo.findFirst({
    where: { id, isDeleted: false },
  });
}

export async function updateTodo(id: string, updates: Partial<{ title: string; description: string; completed: boolean; priority: string }>) {
  return prisma.todo.update({
    where: { id },
    data: updates,
  });
}

export async function deleteTodo(id: string) {
  return prisma.todo.delete({
    where: { id },
  });
}

export async function softDeleteTodo(id: string) {
  return prisma.todo.update({
    where: { id },
    data: { isDeleted: true },
  });
}
