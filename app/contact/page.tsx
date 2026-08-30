import { ContactFormView } from '@/features/contact/view';

export const metadata = {
  title: 'ติดต่อเรา',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">ติดต่อเรา</h1>
        <p className="mb-6 text-gray-600">ส่งข้อความถึงเราได้ที่ด้านล่าง แล้วตรวจสอบได้ในหน้า Dashboard</p>
        <ContactFormView />
      </div>
    </main>
  );
}
