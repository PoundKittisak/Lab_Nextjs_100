import Link from "next/link";
import { coursesData } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Course Overview</p>
        <h1 className="text-4xl font-extrabold text-slate-800">รายวิชาที่น่าสนใจ</h1>
        <p className="mt-3 text-slate-600">เลือกรายวิชาที่คุณสนใจเพื่อดูรายละเอียดเพิ่มเติม</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {coursesData.map((course) => (
          <div key={course.id} className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-48 w-full">
              <img src={course.coverImage} alt={course.titleTh} className="h-full w-full object-cover" />
              <span className="absolute right-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow">
                {course.code}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{course.titleTh}</h2>
                <h3 className="mb-3 text-sm font-medium text-slate-500">{course.titleEn}</h3>
                <p className="mb-4 text-sm text-slate-600">{course.description}</p>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between border-t pt-4 text-xs text-slate-500">
                  <span>ผู้สอน: {course.instructor}</span>
                  <span className="font-semibold text-blue-600">{course.credits} หน่วยกิต</span>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{tag}</span>
                  ))}
                </div>

                <Link
                  href={`/courses/${course.id}`}
                  className="block w-full rounded-xl bg-slate-900 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-600"
                >
                  ดูรายละเอียดวิชา
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
