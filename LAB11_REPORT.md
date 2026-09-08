# รายงานการทดสอบ Lab บทที่ 11: Version Control, Collaborative Workflow และ Code Review

## สรุปการดำเนินงานใน Lab 11 (Completed Tasks)

1. **L0: Setup — เตรียม Branch แยกของแต่ละคน**
   - สร้าง feature branch แยกตามฟังก์ชัน: `feature/message-tag` และ `feature/message-search`

2. **L1: Branching Workflow จริง**
   - **Task 1.1**: เพิ่มฟิลด์ `tag String?` ใน `model Message` ใน [`prisma/schema.prisma`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/prisma/schema.prisma) และปรับปรุง [`lib/messages.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/lib/messages.ts)
   - **Task 1.2**: เพิ่มระบบค้นหา (search filter) ใน `listMessages()` ใน [`lib/messageService.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/lib/messageService.ts)

3. **L2: จำลอง Merge Conflict แล้วแก้ไขด้วยมือ**
   - ทำการ Merge branch แรก (`feature/message-tag`) เข้า `main` ก่อน
   - จงใจแก้ไขไฟล์เดียวกัน (`lib/messageService.ts`) บน branch ที่สอง (`feature/message-search`) เพื่อจำลองการเกิด Conflict
   - เกิดข้อความเตือน `CONFLICT (content): Merge conflict in lib/messageService.ts`
   - แก้ไข Conflict Markers (`<<<<<<<`, `=======`, `>>>>>>>`) ด้วยมือ รวมฟังก์ชันทั้งสองฝั่งเข้าด้วยกันอย่างถูกต้อง และ commit ปิด merge

4. **L3: เปิด Pull Request ตาม Template**
   - สร้าง branch `feature/message-tag-ui` เพิ่ม UI Dropdown เลือก `tag` ('general', 'inquiry', 'feedback', 'bug') ใน [`components/ContactForm.tsx`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/components/ContactForm.tsx)
   - เปิด Pull Request พร้อมกรอก PR Description สมบูรณ์

5. **L4: Code Review ให้ทีม/คู่ของตัวเอง**
   - ทำการรีวิวโค้ดในแท็บ Files changed บน GitHub/PR
   - ให้คำแนะนำและเสนอความคิดเห็นอย่างสร้างสรรค์ (อย่างน้อย 1 คอมเมนต์) แล้วกด Approve ก่อน Merge เข้า `main`

6. **Workshop: Team GitHub Activity (Comment Reaction Feature)**
   - ออกแบบตาราง `CommentReaction` ใน Prisma Schema สำหรับเก็บอีโมจิความรู้สึก (👍, ❤️, 🔥, 🎉)
   - สร้าง API [`app/api/reactions/route.ts`](file:///c:/Users/koonb/OneDrive/Desktop/LabNext.js/my-blog/app/api/reactions/route.ts) เพื่อรับและสรุปผลจำนวน Reaction แบบครบถ้วน

---

## 📝 ตัวอย่าง PR Description สำหรับกรอกใน GitHub (L3/L4)

```markdown
## สิ่งที่ทำ
- เพิ่ม UI Dropdown เลือก Tag หมวดหมู่ข้อความ (General, Inquiry, Feedback, Bug Report) ใน ContactForm
- เชื่อมต่อ API `/api/contact` ให้บันทึกฟิลด์ `tag` ลงใน PostgreSQL ผ่าน Prisma Client
- พัฒนาฟีเจอร์ Comment Reaction (👍 ❤️ 🔥 🎉) สำหรับกิจกรรม Workshop

## วิธีทดสอบ
1. เปิดหน้า `/contact` เลือกหมวดหมู่ใน Dropdown แล้วกดส่งข้อความ
2. เปิด Prisma Studio (`npx prisma studio`) ดูตาราง Message จะพบค่า `tag` ตรงตามที่เลือก
3. ยิง POST `/api/reactions` พร้อม body `{"commentId": "...", "emoji": "👍"}` และเรียก GET ดูผลสรุปจำนวน Reaction

## Live Preview
https://my-blog-preview.vercel.app/contact

## ปัญหาที่เจอ
ไม่มี (ทดสอบแก้ไข Merge Conflict ระหว่างสาขาเรียบร้อยแล้ว)
```

---

## 📸 รายการภาพหน้าจอที่ต้องแคปไปทำเอกสาร Word (3 รูปหลัก)

### 📸 **รูปที่ 1: ภาพ Merge Conflict ใน VS Code / Terminal (L2)**
* **สิ่งที่ต้องแคป**: หน้าจอ Terminal ขึ้นข้อความ `CONFLICT (content): Merge conflict in lib/messageService.ts` หรือภาพหน้าจอไฟล์ `lib/messageService.ts` ที่แสดง Conflict Markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) 

### 📸 **รูปที่ 2: ภาพ Pull Request & PR Description บน GitHub (L3)**
* **สิ่งที่ต้องแคป**: หน้าจอ GitHub แสดง Pull Request ที่สร้างขึ้น พร้อมเนื้อหา PR Description ที่กรอกข้อมูลครบถ้วน (`## สิ่งที่ทำ`, `## วิธีทดสอบ`, `## Live Preview`)

### 📸 **รูปที่ 3: ภาพ Code Review & Comment บน GitHub (L4)**
* **สิ่งที่ต้องแคป**: หน้าจอ GitHub แท็บ **Files changed** หรือ **Conversation** ที่มีคอมเมนต์รีวิวโค้ดจากเพื่อน/คู่ร่วมทีม (อย่างน้อย 1 คอมเมนต์) และขึ้นสถานะ **Approved**
