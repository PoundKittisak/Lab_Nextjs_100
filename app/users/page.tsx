import LikeButton from "../../components/LikeButton";

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export default async function UsersPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 p-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-900">👥 Users ({users.length} คน)</h1>

        <div className="mt-6 grid gap-4">
          {users.map((user: User) => (
            <div
              key={user.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="mt-1 text-gray-600">{user.email}</p>
                  <p className="mt-2 text-sm text-blue-700">{user.company.name}</p>
                </div>
                <LikeButton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
