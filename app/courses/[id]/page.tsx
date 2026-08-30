import Link from "next/link";
import { coursesData } from "@/lib/courses";

export default async function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = coursesData.find((item) => item.id === id);

  if (!course) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-blue-900">ไม่พบรายวิชา {id}</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <img src={course.coverImage} alt={course.titleTh} className="h-64 w-full object-cover" />
        <div className="p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">{course.code}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{course.credits} หน่วยกิต</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-blue-900">{course.titleTh}</h1>
          <h2 className="text-lg font-medium text-slate-500">{course.titleEn}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">{course.description}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">ผู้สอน</p>
              <p className="mt-2 text-lg font-semibold text-slate-800">{course.instructor}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">หัวข้อหลัก</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-sm text-slate-600 shadow-sm">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="text-xl font-semibold text-blue-900">คำอธิบายรายวิชา</h3>
            <p className="mt-3 text-gray-700">
              วิชานี้ช่วยให้นักศึกษาเข้าใจหลักการออกแบบและพัฒนาแอปพลิเคชันที่มีประสิทธิภาพ พร้อมทั้งฝึกทักษะการคิดเชิงวิเคราะห์และการทำงานร่วมกับเทคโนโลยีสมัยใหม่
            </p>
          </div>

          <Link href="/courses" className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-blue-600">
            ← กลับไปหน้ารายวิชา
          </Link>
        </div>
      </div>
    </main>
  );
}
