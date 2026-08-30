# รายงานการทดสอบ Lab บทที่ 10: Web Application Security และ Secure Coding

## สรุปงานที่ได้ดำเนินการเรียบร้อยแล้ว (Completed Tasks)

1. **L0: Setup — Password Field & Error Class**
   - เพิ่ม `password` (bcrypt hash) ใน `User` model และ `authorId` ใน `Message` model ใน [`prisma/schema.prisma`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/prisma/schema.prisma)
   - เพิ่ม `ForbiddenError` (status 403) ใน [`lib/errors.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/lib/errors.ts)

2. **L1: Password Hashing ด้วย bcrypt**
   - อัปเดต [`lib/users.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/lib/users.ts) ให้ใช้ Prisma + Hash รหัสผ่านด้วย `bcrypt.hash(plainPassword, 10)`
   - เขียน Seed Script ใน [`prisma/seed.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/prisma/seed.ts) สร้าง `admin@tsu.ac.th` ด้วยรหัสผ่านที่แฮชแล้ว (`1234`)
   - ปรับ [`app/api/login/route.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/app/api/login/route.ts) ให้ตรวจสอบรหัสผ่านด้วย `bcrypt.compare()`

3. **L2: SQL Injection Prevention**
   - ยืนยันว่าการคิวรีผ่าน Prisma Client ใน [`lib/users.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/lib/users.ts) (`prisma.user.findUnique`) ปลอดภัยด้วย Parameterized Query

4. **L3: XSS Prevention — Sanitize ข้อมูลก่อนแสดงผล**
   - สร้าง [`lib/sanitize.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/lib/sanitize.ts) ฟังก์ชัน `cleanRichText()` โดยใช้ `sanitize-html` กรองแท็กแทรกซึม (<script>, onerror ฯลฯ)

5. **L4: Input Validation ด้วย Zod + Authorization Check**
   - สร้าง [`lib/schemas.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/lib/schemas.ts) กำหนด `messageSchema`, `changePasswordSchema`, และ `todoSchema`
   - ปรับ [`lib/messageService.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/lib/messageService.ts) ใช้ `messageSchema.parse()` ในการ Validate ข้อมูล
   - เพิ่มจุดตรวจ Authorization ก่อนแก้ไข/ลบ (`message.authorId !== sessionUserId`) หากไม่ตรงให้ `throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขข้อความนี้')` ( status 403 )

6. **Workshop: ออกแบบฟีเจอร์ปลอดภัย (ตัวเลือกที่ 1 — Change Password)**
   - สร้าง API [`app/api/change-password/route.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/app/api/change-password/route.ts)
   - ตรวจสอบสิทธิ์ผู้ใช้จาก Cookie Session (Ownership Check)
   - Validate `newPassword` ด้วย Zod (ความยาวอย่างน้อย 8 ตัวอักษร)
   - ตรวจสอบ `oldPassword` ด้วย `bcrypt.compare` ก่อนอนุญาตให้เปลี่ยน
   - Hash `newPassword` ใหม่ด้วย `bcrypt` ก่อนบันทึกลง PostgreSQL

---

## 📸 รายการรูปภาพที่ต้องแคปประกอบทำรายงาน Word (5 รูปหลัก)

### 📸 **รูปที่ 1: ตรวจสอบ Password Hash ใน Prisma Studio (L1)**
* **วิธีเปิด**: รัน `npx prisma studio` ใน Terminal แล้วเปิดเบราว์เซอร์ที่ `http://localhost:5555`
* **ตารางที่ต้องแคป**: คลิกตาราง **`User`**
* **สิ่งที่ต้องเห็นในรูป**: คอลัมน์ `password` ของบัญชี `admin@tsu.ac.th` แสดงเป็น **Hash String ยาวๆ (ขึ้นต้นด้วย `$2b$`)** ไม่ใช่ตัวอักษรธรรมดา '1234'

### 📸 **รูปที่ 2: การทดสอบ Login ด้วย bcrypt (L1)**
* **วิธีทำ**: ยิง `POST http://localhost:3000/api/login` พร้อม body `{"email": "admin@tsu.ac.th", "password": "1234"}`
* **สิ่งที่ต้องเห็นในรูป**: ผลลัพธ์ตอบกลับ `{ "ok": true }` พร้อม Status **200 OK**

### 📸 **รูปที่ 3: การทดสอบ Input Validation ด้วย Zod (L4)**
* **วิธีทำ**: ยิง `POST http://localhost:3000/api/contact` พร้อม body ที่ชื่อสั้นเกินไป เช่น `{"name": "a", "email": "admin@tsu.ac.th", "message": "hello"}`
* **สิ่งที่ต้องเห็นในรูป**: ผลลัพธ์ตอบกลับ `{ "error": "ชื่อสั้นเกินไป" }` พร้อม Status **400 Bad Request**

### 📸 **รูปที่ 4: การทดสอบ Authorization Check (Forbidden 403) (L4)**
* **วิธีทำ**: ยิง `PATCH http://localhost:3000/api/messages/<id_ของผู้อื่น>` โดยใช้ Session ของผู้ใช้อื่น
* **สิ่งที่ต้องเห็นในรูป**: ผลลัพธ์ตอบกลับ `{ "error": "คุณไม่มีสิทธิ์แก้ไขข้อความนี้" }` พร้อม Status **403 Forbidden**

### 📸 **รูปที่ 5: การทดสอบเปลี่ยนรหัสผ่านปลอดภัย (Workshop - Change Password)**
* **วิธีทำ**: ยิง `POST http://localhost:3000/api/change-password` พร้อม body `{"oldPassword": "1234", "newPassword": "newpassword123"}`
* **สิ่งที่ต้องเห็นในรูป**: ผลลัพธ์ตอบกลับ `{ "ok": true, "message": "เปลี่ยนรหัสผ่านสำเร็จเรียบร้อยแล้ว" }` พร้อม Status **200 OK**
