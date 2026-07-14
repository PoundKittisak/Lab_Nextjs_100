interface Course {
  id: string;
  name: string;
  credits: number;
}

const courses: Course[] = [
  { id: "0214321", name: "Web App Design & Dev", credits: 3 },
  { id: "0214101", name: "Programming Fundamentals", credits: 3 },
  { id: "0214201", name: "Data Structures", credits: 3 },
];

export default function Courses() {
  return (
    <main className="min-h-screen bg-gray-50 p-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-900">รายวิชาของฉัน</h1>

        <div className="mt-6 grid gap-4">
          {courses.map((course: Course) => (
            <div
              key={course.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-blue-700">{course.id}</p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900">{course.name}</h2>
              <p className="mt-2 text-gray-600">{course.credits} หน่วยกิต</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
