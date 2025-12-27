import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block rounded px-3 py-2 text-sm transition
     ${isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-indigo-50"}`;

  return (
    <div className="h-full bg-white p-6">
      <h2 className="mb-6 text-xl font-bold text-indigo-600">
        ReflexCMS
      </h2>

      <nav className="space-y-2">
        <NavLink to="/admin/panel" className={linkClass}>
          Admin Panel
        </NavLink>

        <NavLink to="/admin/user" className={linkClass}>
          Users
        </NavLink>

        <NavLink to="/admin/account" className={linkClass}>
          Account
        </NavLink>
      </nav>
    </div>
  );
}
