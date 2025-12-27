import { useEffect, useState, useRef, useCallback } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

export default function ProvostPanel() {
  const [complaints, setComplaints] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/complaint/getAllComplaints", { headers: { 'Cache-Control': 'no-cache' } });
      setComplaints(Array.isArray(res.data.complaints) ? res.data.complaints : []);
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
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

  const saveRemarks = useCallback(async (id, shouldClose) => {
    try {
      await API.put(`/complaint/remarks/provost/${id}`, { remarks: remarks[id] || "", close: shouldClose });
      setComplaints((prev) => prev.map((c) => c._id === id ? { ...c, remarksByProvost: remarks[id] || c.remarksByProvost, status: shouldClose ? 'closed' : c.status } : c));
      toast.success(shouldClose ? "Closed with remarks" : "Remarks saved");
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      toast.error("Failed to save remarks");
    }
  }, [remarks]);

  const handleRemarksChange = useCallback((id, value) => {
    setRemarks(prev => ({ ...prev, [id]: value }));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Provost - Escalated Complaints</h2>
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
    <div className="w-8/12 mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">Provost - Escalated Complaints</h2>
      
      {complaints.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No complaints escalated to you at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaints.map((c) => (
            <div key={c._id} className="border border-blue-100 rounded p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-900">{c.title}</h3>
                <span className="text-xs font-medium px-3 py-1 rounded-full border border-blue-300 text-blue-700 uppercase bg-blue-50">{c.status}</span>
              </div>
              <p className="text-sm mt-2">{c.description}</p>
              
              {/* Display Previous Remarks */}
              <div className="mt-4 space-y-2">
                {c.remarksByWarden && (
                  <div className="bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
                    <p className="text-xs font-medium text-yellow-800">Warden Remarks:</p>
                    <p className="text-sm text-yellow-700">{c.remarksByWarden}</p>
                  </div>
                )}
                
                {c.remarksByEmployee && (
                  <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                    <p className="text-xs font-medium text-blue-800">Employee Remarks:</p>
                    <p className="text-sm text-blue-700">{c.remarksByEmployee}</p>
                  </div>
                )}
                
                {c.remarksByDeputyProvost && (
                  <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                    <p className="text-xs font-medium text-green-800">Deputy Provost Remarks:</p>
                    <p className="text-sm text-green-700">{c.remarksByDeputyProvost}</p>
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
                </div>
                <div>
                  <textarea
                    placeholder="Your remarks as Provost..."
                    className="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={remarks[c._id] || ""}
                    onChange={(e) => handleRemarksChange(c._id, e.target.value)}
                  />
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => saveRemarks(c._id, false)} className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-indigo-600 shadow hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">Save Remarks</button>
                    <button onClick={() => saveRemarks(c._id, true)} className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white border border-violet-600 shadow hover:from-purple-700 hover:to-violet-700 transition-all duration-200">Close with Remarks</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


