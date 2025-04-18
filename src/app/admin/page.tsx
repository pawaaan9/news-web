import React from "react";
import Link from "next/link";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-gray-700 font-dmSans">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="block p-2 hover:bg-gray-700 rounded font-notoSans"
              >
                යෙදුම්
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold font-dmSans">Page Name</h1>
          <div>
            {/* Add user profile or logout button here */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
