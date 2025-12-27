import { useEffect, useState, useRef, useCallback } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

export default function EmployeePanel() {
  const [complaints, setComplaints] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/complaint/getAllComplaints");
      console.log('EmployeePanel - Raw response:', res.data);
      setComplaints(res.data.complaints || []);
      console.log('EmployeePanel - Set complaints:', res.data.complaints);
    } catch (e) {
      console.error('EmployeePanel - Error fetching complaints:', e);
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  }, []);

  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchComplaints();
  }, [fetchComplaints]);

  const updateStatus = useCallback(async (id, status) => {
    try {
      await API.put(`/complaint/update-status/${id}`, { status });
      setComplaints((prev) => prev.map((c) => c._id === id ? { ...c, status } : c));
      toast.success("Status updated");
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      toast.error("Failed to update status");
    }
  }, []);

  const saveRemarks = useCallback(async (id) => {
    try {
      await API.put(`/complaint/remarks/employee/${id}`, { remarks: remarks[id] || "" });
      toast.success("Remarks saved");
      // Refresh complaints to get updated remarks
      fetchComplaints();
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      toast.error("Failed to save remarks");
    }
  }, [remarks, fetchComplaints]);

  const forwardToProvost = useCallback(async (id) => {
    try {
      await API.put(`/complaint/forward/${id}`, { target: "Provost" });
      setComplaints((prev) => prev.map((c) => c._id === id ? { ...c, forwardedTo: "Provost" } : c));
      toast.success("Forwarded to Provost");
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      toast.error("Failed to forward");
    }
  }, []);

  const handleRemarksChange = useCallback((id, value) => {
    setRemarks(prev => ({ ...prev, [id]: value }));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Employee - Assigned Complaints</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading complaints...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">Employee - Assigned Complaints</h2>
      
      {complaints.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No complaints assigned to you at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {complaints.map((c) => (
            <div key={c._id} className="border border-blue-100 rounded p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-900">{c.title}</h3>
                <span className="text-xs font-medium px-3 py-1 rounded-full border border-blue-300 text-blue-700 uppercase bg-blue-50">{c.status}</span>
              </div>
              <p className="text-sm mt-2">{c.description}</p>
              
              {/* Display Previous Remarks */}
              <div className="mt-4 space-y-2">
                {c.remarksByEmployee && (
                  <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                    <p className="text-xs font-medium text-blue-800">Your Previous Remarks:</p>
                    <p className="text-sm text-blue-700">{c.remarksByEmployee}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-3 flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c._id, e.target.value)}
                    className="px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="new">New</option>
                    <option value="pending">Pending</option>
                    <option value="progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button onClick={() => forwardToProvost(c._id)} className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white border border-violet-600 shadow hover:from-purple-700 hover:to-violet-700 transition-all duration-200">Forward to Provost</button>
                </div>
                <div>
                  <textarea
                    placeholder="Add your remarks..."
                    className="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={remarks[c._id] || ""}
                    onChange={(e) => handleRemarksChange(c._id, e.target.value)}
                  />
                  <button onClick={() => saveRemarks(c._id)} className="mt-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-indigo-600 shadow hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">Save Remarks</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


