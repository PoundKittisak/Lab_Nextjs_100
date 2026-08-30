# Workshop: ออกแบบ Schema + CRUD ของตนเอง (Todo Resource)

## Task W.1 — ออกแบบ Prisma Schema
Resource ที่เลือกออกแบบ: **Todo (รายการงานที่ต้องทำ)**
```prisma
model Todo {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  priority    String   @default("medium")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  isDeleted   Boolean  @default(false)
}
```

---

## Task W.2 — CRUD ครบ 4 Operation ด้วย Prisma
1. **Create (POST)**: `POST /api/todos` — ใช้ `prisma.todo.create()` สร้างรายการใหม่
2. **Read (GET all & GET one)**:
   - `GET /api/todos`: ใช้ `prisma.todo.findMany()` ดึงรายการทั้งหมด (รองรับ Query Param `?search=` และ `?completed=true|false`)
   - `GET /api/todos/[id]`: ใช้ `prisma.todo.findFirst()` ดึงรายการเฉพาะชิ้นผ่าน Dynamic Route
3. **Update (PATCH)**: `PATCH /api/todos/[id]` — ใช้ `prisma.todo.update()` แก้ไขเฉพาะฟิลด์ที่ส่งมา
4. **Delete (DELETE)**: `DELETE /api/todos/[id]` — ใช้ `prisma.todo.delete()` ลบข้อมูลจริงออกจากฐานข้อมูล

---

## Task W.3 — Error Handling กับ Database
- ดักจับ Error Code จาก Prisma เช่น `P2025` (Record to update/delete not found) และแปลงเป็น `NotFoundError` (Status 404) สื่อสารชัดเจนกับผู้ใช้

---

## Task W.4 — Migration + Seed
- รัน Migration สร้างตาราง `Todo` บน PostgreSQL เรียบร้อย
- เขียน Seed Script ใน `prisma/seed.ts` เติมข้อมูลเริ่มต้น 3 รายการ:
  1. "ทำการบ้าน Next.js Week 9" (completed: true, priority: 'high')
  2. "อ่านเอกสาร Prisma Docs" (completed: false, priority: 'medium')
  3. "เตรียมพรีเซนต์โปรเจกต์เว็บ" (completed: false, priority: 'high')

---

## Task W.5 — Layer Mapping

| ชั้น (Layer) | ไฟล์ในโปรเจกต์ของนิสิต | หน้าที่ (เขียนเอง) |
|---|---|---|
| **Controller** | `app/api/todos/route.ts`<br>`app/api/todos/[id]/route.ts` | รับ HTTP Request (`GET`, `POST`, `PATCH`, `DELETE`), ดึง Query/Body/Params, เรียกใช้งาน Service Layer และคืน HTTP Response พร้อม Status Code |
| **Service** | `lib/todoService.ts` | ควบคุม Business Logic, Validation ข้อมูล, จัดการ Filter/Search, และดักจับ Prisma Error Code (`P2025`) แปลงเป็น Custom Error Class |
| **Model (Prisma)** | `lib/todos.ts` | จัดการการเชื่อมต่อกับ PostgreSQL ผ่าน Prisma Client (`prisma.todo.create`, `findMany`, `update`, `delete`) |
| **prisma/schema.prisma** | `prisma/schema.prisma` | กำหนดโครงสร้างตารางฐานข้อมูล (`model Todo`), ฟิลด์, Data Types (String, Boolean, DateTime) และ Constraints ต่างๆ |

---

## Task W.6 — Reflection

1. **อธิบาย Resource ที่เลือกออกแบบ**:
   - เลือกออกแบบ Resource **Todo** (รายการงานที่ต้องทำ) มีฟิลด์ `id`, `title`, `description`, `completed`, `priority`, `createdAt`, `updatedAt` และ `isDeleted`
   - กำหนดให้ `id` ใช้ `@default(cuid())` เพื่อสุ่ม ID ที่มีความเสถียร, `completed` มีค่าเริ่มต้นเป็น `false`, `priority` มีค่าเริ่มต้นเป็น `"medium"`, และ `updatedAt` ใช้ `@updatedAt` เพื่อปรับเปลี่ยนเวลาอัตโนมัติเมื่อข้อมูลถูกอัปเดต

2. **จุดที่ต้องตัดสินใจและเหตุผลในการออกแบบ**:
   - เลือกใส่ Constraint และ Default values ที่ชั้น Prisma Schema เพื่อให้ฐานข้อมูลเป็นด่านแรกที่รับประกันความถูกต้องของข้อมูล (Data Integrity)
   - ดักจับ Prisma Error Code `P2025` ใน Service Layer เพื่อแปลงเป็น `NotFoundError` (status 404) พร้อมข้อความที่สื่อสารเข้าใจง่าย แทนที่จะปล่อยให้เซิร์ฟเวอร์ตอบ 500 หรือ Crash

3. **เปรียบเทียบการใช้ In-memory Array กับฐานข้อมูลจริง**:
   - การใช้ฐานข้อมูลจริง (PostgreSQL + Prisma) ช่วยให้ข้อมูลคงค้างถาวร (Persistent) แม้จะ Restart dev server ข้อมูลก็ไม่สูญหาย
   - มีระบบ Migration คอยบันทึกประวัติการเปลี่ยนแปลงของ Schema ชัดเจน และมี Type Safety ที่สร้างจาก Prisma Client โดยตรง
