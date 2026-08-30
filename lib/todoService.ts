import * as TodoModel from './todos';
import { NotFoundError, ValidationError } from './errors';
import { Prisma } from '@prisma/client';

export async function createTodo(data: {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}) {
  if (!data.title?.trim()) {
    throw new ValidationError('หัวข้อ Todo ห้ามเป็นค่าว่าง');
  }

  if (data.title.trim().length < 2) {
    throw new ValidationError('หัวข้อ Todo ต้องมีความยาวอย่างน้อย 2 ตัวอักษร');
  }

  const validPriorities = ['low', 'medium', 'high'];
  const priority = data.priority ?? 'medium';
  if (!validPriorities.includes(priority)) {
    throw new ValidationError('ระดับความสำคัญ (priority) ต้องเป็น low, medium หรือ high เท่านั้น');
  }

  return TodoModel.addTodo({
    title: data.title.trim(),
    description: data.description?.trim() ?? '',
    priority: priority,
  });
}

export async function listTodos(search?: string, completed?: string) {
  let list = await TodoModel.getTodos();

  if (search?.trim()) {
    const keyword = search.trim().toLowerCase();
    list = list.filter(
      (t) =>
        t.title.toLowerCase().includes(keyword) ||
        (t.description && t.description.toLowerCase().includes(keyword))
    );
  }

  if (completed !== undefined && completed !== '') {
    const isCompleted = completed === 'true';
    list = list.filter((t) => t.completed === isCompleted);
  }

  return list;
}

export async function getTodoById(id: string) {
  const item = await TodoModel.findTodoById(id);
  if (!item) {
    throw new NotFoundError('ไม่พบรายการ Todo นี้');
  }
  return item;
}

export async function editTodo(
  id: string,
  updates: Partial<{
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
  }>
) {
  if (updates.title !== undefined) {
    if (!updates.title.trim()) {
      throw new ValidationError('หัวข้อ Todo ห้ามเป็นค่าว่าง');
    }
    if (updates.title.trim().length < 2) {
      throw new ValidationError('หัวข้อ Todo ต้องมีความยาวอย่างน้อย 2 ตัวอักษร');
    }
  }

  if (updates.priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(updates.priority)) {
      throw new ValidationError('ระดับความสำคัญ (priority) ต้องเป็น low, medium หรือ high เท่านั้น');
    }
  }

  try {
    return await TodoModel.updateTodo(id, {
      ...(updates.title !== undefined && { title: updates.title.trim() }),
      ...(updates.description !== undefined && { description: updates.description.trim() }),
      ...(updates.completed !== undefined && { completed: updates.completed }),
      ...(updates.priority !== undefined && { priority: updates.priority }),
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new NotFoundError('ไม่พบรายการ Todo นี้');
    }
    throw err;
  }
}

export async function removeTodo(id: string) {
  try {
    return await TodoModel.deleteTodo(id);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new NotFoundError('ไม่พบรายการ Todo นี้');
    }
    throw err;
  }
}
