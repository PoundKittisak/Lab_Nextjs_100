import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // เคลียร์ข้อมูลเดิม
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();
  await prisma.todo.deleteMany();

  // Seed ข้อมูล User พร้อมแฮชรหัสผ่านด้วย bcrypt
  const hashed = await bcrypt.hash('1234', 10);
  await prisma.user.upsert({
    where: { email: 'admin@tsu.ac.th' },
    update: {},
    create: { 
      email: 'admin@tsu.ac.th', 
      password: hashed,
      role: 'admin'
    },
  });

  // Seed ข้อมูล Message
  await prisma.message.createMany({
    data: [
      { name: 'Alice', email: 'a@tsu.ac.th', message: 'สวัสดี' },
      { name: 'Bob', email: 'b@tsu.ac.th', message: 'Hello' },
    ],
  });

  // Seed ข้อมูล Todo (Workshop)
  await prisma.todo.createMany({
    data: [
      {
        title: 'ทำการบ้าน Next.js Week 10 Security',
        description: 'ต่อยอด bcrypt, Zod, sanitize-html และ Authorization',
        completed: true,
        priority: 'high',
      },
      {
        title: 'อ่านเอกสาร Web Security',
        description: 'ศึกษาเรื่อง XSS, SQL Injection และ Password Hashing',
        completed: false,
        priority: 'medium',
      },
      {
        title: 'ทดสอบ Change Password Endpoint',
        description: 'ทดสอบเปลี่ยนรหัสผ่านด้วย bcrypt.compare และ Zod validation',
        completed: false,
        priority: 'high',
      },
    ],
  });

  console.log('Seed completed successfully (User, Message & Todo)!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });