interface CourseDetail {
  name: string;
  desc: string;
  instructor: string;
}

const courseData: Record<string, CourseDetail> = {
  "0214321": {
    name: "Web App Design & Dev",
    desc: "Next.js + React + DB",
    instructor: "อ.สิรินดา",
  },
  "0214101": {
    name: "Programming Fundamentals",
    desc: "C/C++ พื้นฐาน",
    instructor: "อ.ประจำ",
  },
  "0214201": {
    name: "Data Structures",
    desc: "โครงสร้างข้อมูลและอัลกอริทึม",
    instructor: "อ.ธนกฤษ",
  },
};

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courseData[id];

  if (!course) {
    return (
      <main className="min-h-screen bg-gray-50 p-12">
        <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-blue-900">ไม่พบรายวิชา {id}</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-12">
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          รหัสวิชา: {id}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-blue-900">{course.name}</h1>
        <p className="mt-4 text-lg text-gray-700">{course.desc}</p>
        <p className="mt-2 text-gray-500">ผู้สอน: {course.instructor}</p>
      </div>
    </main>
  );
}
