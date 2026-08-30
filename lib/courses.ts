// lib/courses.ts
export interface Course {
  id: string;
  code: string;
  titleTh: string;
  titleEn: string;
  credits: number;
  instructor: string;
  description: string;
  coverImage: string;
  tags: string[];
}

export const coursesData: Course[] = [
  {
    id: "1",
    code: "CS101",
    titleTh: "การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น",
    titleEn: "Introduction to Computer Programming",
    credits: 3,
    instructor: "ดร. สมชาย สายโค้ด",
    description: "เรียนรู้พื้นฐานการเขียนโปรแกรม ตรรกะทางคอมพิวเตอร์ โครงสร้างควบคุม และการแก้ปัญหาอย่างเป็นระบบด้วยภาษาทันสมัย",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    tags: ["Programming", "Basic", "Computer Science"],
  },
  {
    id: "2",
    code: "CS202",
    titleTh: "การพัฒนาเว็บแอปพลิเคชันสมัยใหม่",
    titleEn: "Modern Web Application Development",
    credits: 3,
    instructor: "อ. วิภาวี เว็บดีไซน์",
    description: "เจาะลึกการพัฒนาเว็บด้วย Next.js, React และ Tailwind CSS ทั้งฝั่ง Frontend และ Backend พร้อมการเชื่อมต่อ API และ Database",
    coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    tags: ["Web Dev", "Next.js", "React"],
  },
  {
    id: "3",
    code: "CS303",
    titleTh: "การออกแบบประสบการณ์ผู้ใช้และส่วนติดต่อผู้ใช้",
    titleEn: "UX/UI Design Fundamentals",
    credits: 3,
    instructor: "อ. กิตติศักดิ์ กราฟิก",
    description: "ศึกษาหลักการวางโครงร่าง Layout, User Journey, Color Theory และการใช้โปรแกรม Figma เพื่อออกแบบอินเทอร์เฟซที่ใช้งานง่าย",
    coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
    tags: ["UI/UX", "Design", "Figma"],
  },
];
