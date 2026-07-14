export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 p-12">
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-blue-900">เกี่ยวกับฉัน</h1>

        <ul className="space-y-3 text-gray-700">
          <li>
            <span className="font-semibold">🎓 สาขา:</span> วิทยาการคอมพิวเตอร์
          </li>
          <li>
            <span className="font-semibold">📚 รายวิชาที่ชอบ:</span> Web App Design & Dev
          </li>
          <li>
            <span className="font-semibold">🎯 เป้าหมาย:</span> พัฒนาทักษะการสร้างเว็บแอปและเรียนรู้ TypeScript อย่างลึกซึ้ง
          </li>
        </ul>
      </div>
    </main>
  );
}
