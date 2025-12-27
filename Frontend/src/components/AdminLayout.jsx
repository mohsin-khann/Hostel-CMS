import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AdminLayout({ sidebar, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`
          fixed z-40 inset-y-0 left-0 w-64 bg-white border-r
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        {sidebar}
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* TOP BAR (MOBILE) */}
        <div className="md:hidden flex items-center gap-3 bg-white border-b px-4 py-3">
          <button
            onClick={() => setOpen(true)}
            className="text-xl"
          >
            ☰
          </button>
          <span className="font-semibold">Admin Panel</span>
        </div>

        {/* OVERLAY (mobile) */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
          />
        )}

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
