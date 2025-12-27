import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import Sidebar from "./Sidebar";
import API from "../../api/api";
import toast from "react-hot-toast";

export default function User() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/user/getAllUsers");

        const raw =
          res.data?.users ||
          res.data?.data?.users ||
          res.data?.data ||
          res.data;

        if (Array.isArray(raw)) {
          setUsers(raw);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users");
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u?.firstName?.toLowerCase().includes(q) ||
      u?.lastName?.toLowerCase().includes(q) ||
      u?.email?.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout sidebar={<Sidebar />}>
      {/* LEFT CONTENT */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full max-w-xl rounded border px-4 py-2"
        />

        {/* MOBILE SCROLL FIX */}
        <div className="relative -mx-4 md:mx-0 overflow-x-auto">
          <table className="min-w-[1000px] w-full border-collapse bg-white shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, i) => (
                  <tr key={u._id} className="border-b">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{u.firstName}</td>
                    <td className="p-3">{u.lastName}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">
                      <button className="rounded bg-red-500 px-4 py-1 text-white">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
