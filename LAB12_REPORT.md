# รายงานการทดสอบ Lab บทที่ 12: Deployment และการติดตั้งเว็บแอปพลิเคชันบน Server ด้วย Vercel

## สรุปการดำเนินงานใน Lab 12 (Completed Tasks)

1. **L0: ตรวจสอบการเชื่อมต่อ GitHub ↔ Vercel**
   - ตรวจสอบ Project `my-blog` บน Vercel Dashboard ยืนยันว่าตั้งค่า `Production Branch` เป็น `main` เรียบร้อยแล้ว

2. **L1: ตั้งค่า Environment Variables**
   - ตั้งค่าตัวแปร `DATABASE_URL` บน Vercel Dashboard (Project Settings → Environment Variables) โดยใช้ Connection String แบบ Pooled จาก Neon PostgreSQL (มี `-pooler` ในชื่อ host)
   - ครอบคลุมทั้ง 3 Scope: **Production**, **Preview**, **Development**
   - กด Redeploy ในแท็บ Deployments เพื่อให้ระบบอ่านค่าตัวแปรใหม่

3. **L2: ทดสอบผ่าน Preview Deployment**
   - สร้างสาขาใหม่ `test/verify-deployment` ปรับแต่งข้อความ Footer ใน [`app/layout.tsx`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/app/layout.tsx)
   - เปิด Pull Request เพื่อกระตุ้นให้ Vercel Bot สร้าง **Preview Deployment Link** อัตโนมัติ
   - ทดสอบฟีเจอร์ CRUD (สร้าง/อ่าน/แก้ไข/ลบ) บน Preview URL ผลการทำงานถูกต้องและเชื่อมต่อ Neon Database ได้จริง

4. **L3: Merge เข้า Production และยืนยันการทำงานจริง**
   - รวม (Merge) Pull Request จาก L2 เข้าสู่สาขา `main`
   - Vercel ทำการ Auto Deploy ขึ้น **Production URL**
   - ทดสอบ CRUD บน Production URL และตรวจสอบผ่าน Neon Dashboard / Prisma Studio ยืนยันว่าข้อมูลถูกบันทึกลง Neon Database จริง

5. **L4: จำลอง Deployment ล้มเหลว วินิจฉัย + Rollback**
   - จำลองเหตุการณ์ระบบขัดข้องโดยแก้ไขชื่อ Environment Variable เป็น `DATABASE_URL_TEMP_TEST`
   - ตรวจสอบสาเหตุจาก **Runtime Logs** บน Vercel Dashboard พบข้อความเตือนเกี่ยวกับ Database Connection Error
   - ทำการคืนค่า `DATABASE_URL` ให้ถูกต้อง แล้วทดลองใช้ฟีเจอร์ **Instant Rollback** โดยไปที่แท็บ Deployments แล้วกด **Promote to Production** เวอร์ชันก่อนหน้าที่ทำงานได้ปกติ

6. **Workshop: Team Deployment Readiness**
   - จัดทำ **Deployment Readiness Checklist** สำหรับเตรียมความพร้อมของทีมก่อนเข้าสู่ Final Project

---

## 📋 Team Deployment Readiness Checklist (Workshop)

1. **[ ] Pre-Merge Code Check**: ตรวจสอบว่าโค้ดผ่าน `npx tsc --noEmit` และ `npm run build` บนเครื่อง local โดยไม่มี Error ก่อนกด Merge เข้า `main`
2. **[ ] Environment Variables Audit**: ตรวจสอบว่า `DATABASE_URL` และค่าลับต่างๆ ถูกตั้งค่าใน Vercel ครบทั้ง Production & Preview scope
3. **[ ] Rollback Authority & Communication**: กำหนดผู้มีอำนาจกด Instant Rollback และแจ้งเตือนทีมในช่องทางสื่อสารหลักทันทีเมื่อเกิดเหตุ Production พัง
4. **[ ] Database Migration Safety**: รัน `npx prisma db push` หรือ Migration บน Neon Database ให้เรียบร้อยก่อน Deploy ฟีเจอร์ใหม่ที่กระทบโครงสร้างตาราง
5. **[ ] Log Monitoring Checklist**: เข้าตรวจสอบ Vercel Runtime Logs และ Neon Dashboard ทุกครั้งหลังการ Deploy ขึ้น Production

---

## 📸 รายการภาพหน้าจอที่ต้องแคปไปทำเอกสาร Word (4 รูปหลัก)

### 📸 **รูปที่ 1: หน้า Environment Variables ใน Vercel Dashboard (L1)**
* **สิ่งที่ต้องแคป**: หน้าจอเว็บ Vercel (Project Settings → Environment Variables) แสดงตัวแปร `DATABASE_URL` ที่ตั้งค่าไว้สำหรับ Production, Preview และ Development

### 📸 **รูปที่ 2: หน้า Preview Deployment & Vercel Bot Comment ใน PR (L2)**
* **สิ่งที่ต้องแคป**: หน้าจอ Pull Request บน GitHub แสดงคอมเมนต์จาก **Vercel Bot** พร้อมลิงก์ **Preview URL**

### 📸 **รูปที่ 3: หน้า Production Deployment บน Vercel Dashboard (L3)**
* **สิ่งที่ต้องแคป**: หน้าเว็บ Vercel ในแท็บ **Deployments** แสดงสถานะ `Production` เป็นสีเขียว (**Ready**) พร้อมโดเมนหลักของโปรเจกต์

### 📸 **รูปที่ 4: หน้า Runtime Logs หรือ Instant Rollback บน Vercel (L4)**
* **สิ่งที่ต้องแคป**: หน้าจอ Vercel Dashboard ตรงแท็บ **Logs** แสดงข้อความ Runtime Error หรือปุ่ม/สถานะการกด **Promote to Production** (Instant Rollback)
