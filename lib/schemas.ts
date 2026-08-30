import { z } from 'zod';

export const messageSchema = z.object({
  name: z.string().min(2, 'ชื่อสั้นเกินไป').max(100),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  message: z.string().min(5, 'ข้อความสั้นเกินไป').max(1000),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'โปรดระบุรหัสผ่านเดิม'),
  newPassword: z.string().min(8, 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
});

export const todoSchema = z.object({
  title: z.string().min(2, 'หัวข้อ Todo ต้องมีความยาวอย่างน้อย 2 ตัวอักษร').max(100),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high'], { message: 'ระดับความสำคัญต้องเป็น low, medium หรือ high เท่านั้น' }).optional(),
  completed: z.boolean().optional(),
});
