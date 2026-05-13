import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-green-700 mb-2">Admin</h1>
        <p className="text-gray-600 text-sm mb-6">
          User management and contact inbox moderation.
        </p>
        <nav className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
          <Link
            href="/admin/users"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-green-700"
          >
            Users
          </Link>
          <Link
            href="/admin/inbox"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-green-700"
          >
            Inbox
          </Link>
        </nav>
        {children}
      </div>
    </div>
  );
}
