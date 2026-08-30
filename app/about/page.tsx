import Image from 'next/image';

export default function AboutPage() {
  const profile = {
    name: 'กิตติศักดิ์ นวลประจักร์',
    nickname: 'ปอน',
    studentId: '6720210100',
    major: 'วิทยาการคอมพิวเตอร์ (CIS)',
    bio: 'พัฒนาทักษะการสร้างเว็บแอปและการเรียนรู้ TypeScript อย่างลึกซึ้ง',
    motto: 'Done is better than perfect.',
    hobbies: ['เล่นเกม', 'ฟังเพลง', 'ดูซีรีส์'],
    movies: ['Interstellar', 'Avatar', 'Inception'],
    idol: 'Elon Musk',
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden md:flex">
          <div className="md:w-1/3 bg-slate-800 p-8 text-white flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 bg-slate-200 relative">
              <Image
                src="/images/dd.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 192px"
              />
            </div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-slate-300 font-medium">ชื่อเล่น: {profile.nickname}</p>
            <p className="text-xs text-slate-400 mt-1">รหัสนิสิต: {profile.studentId}</p>
            <span className="mt-3 px-3 py-1 bg-blue-600 text-xs rounded-full">{profile.major}</span>
          </div>

          <div className="md:w-2/3 p-8 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 border-b pb-1">🎯 เป้าหมายในชีวิต</h2>
              <p className="text-slate-600 mt-2">{profile.bio}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-500 font-bold uppercase">คติประจำใจ</p>
                <p className="text-slate-700 italic font-medium">"{profile.motto}"</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <p className="text-xs text-purple-500 font-bold uppercase">Idol ในดวงใจ</p>
                <p className="text-slate-700 font-medium">⭐ {profile.idol}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">🎮 งานอดิเรก & สิ่งที่ชอบ</h3>
            <div className="flex flex-wrap gap-2">
              {profile.hobbies.map((hobby, index) => (
                <span key={index} className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-md font-medium">
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">🎬 ภาพยนตร์โปรด</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              {profile.movies.map((movie, index) => (
                <li key={index} className="text-sm">{movie}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
