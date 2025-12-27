import AdminLayout from "./AdminLayout";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/api";

export default function AdminPanel() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    API.get("/complaint/getAllComplaints")
      .then((res) => setComplaints(res.data.complaints))
      .catch(() => toast.error("Cannot load complaints"));
  }, []);

  const filtered = complaints.filter(
    (c) =>
      c.description.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || c.status === statusFilter)
  );

  const pages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/complaint/update-status/${id}`, { status });
      setComplaints((p) =>
        p.map((c) => (c._id === id ? { ...c, status } : c))
      );
    } catch {
      toast.error("Status update failed");
    }
  };

  const forward = async (id, role) => {
    try {
      await API.put(`/complaint/forward/${id}`, { target: role });
      setComplaints((p) =>
        p.map((c) => (c._id === id ? { ...c, forwardedTo: role } : c))
      );
    } catch {
      toast.error("Forward failed");
    }
  };

  return (
    <AdminLayout sidebar={<Sidebar />}>
      {/* LEFT-ALIGNED CONTAINER (no mx-auto) */}
      <div className="max-w-none pl-2 pr-6 space-y-6">
        {/* SEARCH + FILTER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search complaints..."
            className="w-full md:w-[55%] rounded border px-4 py-2"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-60 rounded border px-4 py-2"
          >
            <option value="All">All</option>
            <option value="new">New</option>
            <option value="pending">Pending</option>
            <option value="progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* BIGGER / WIDER CARDS */}
        <div className="grid gap-8 xl:grid-cols-2">
          {data.map((c, i) => (
            <div
              key={c._id}
              className="rounded-xl border bg-white p-6 shadow-md"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">
                  {c.title}
                </h3>
                <span className="text-sm font-medium text-blue-600 uppercase">
                  {c.status}
                </span>
              </div>

              <p className="mt-3 text-base text-gray-600 line-clamp-3">
                {c.description}
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">S.No: {i + 1}</span>
                  <select
                    value={c.status}
                    onChange={(e) =>
                      updateStatus(c._id, e.target.value)
                    }
                    className="rounded-md border px-3 py-1"
                  >
                    <option value="new">New</option>
                    <option value="pending">Pending</option>
                    <option value="progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["Warden", "Employee", "DeputyProvost", "Provost"].map(
                    (r) => (
                      <button
                        key={r}
                        onClick={() => forward(c._id, r)}
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700 transition"
                      >
                        {r}
                      </button>
                    )
                  )}
                </div>

                {c.forwardedTo && (
                  <p className="text-sm text-gray-500">
                    Assigned to{" "}
                    <span className="font-medium text-blue-600">
                      {c.forwardedTo}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * perPage + 1}–
            {Math.min(page * perPage, filtered.length)} of{" "}
            {filtered.length}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="rounded-md border p-2"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page === pages}
              className="rounded-md border p-2"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
