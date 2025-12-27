import { useEffect, useState } from 'react';
import API from '../../api/api';

const Complaint = () => {
  const [complaint, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await API.get('/complaint/getAllComplaints');
        console.log('response is', response.data);
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error('Error fetching complaints:', error.response?.data?.message || error.message);
      }
    };

    fetchComplaints();
  }, [complaint]);

  const pendingComplaints = complaint.filter((c) => c.status === 'pending');
  const resolvedComplaints = complaint.filter((c) => c.status === 'closed');
  const progressComplaints = complaint.filter((c) => c.status === 'progress');
  const newComplaints = complaint.filter((c) => c.status === 'new');

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  const renderComplaintsTable = (title, complaints) => (
    <div style={{ transform: 'translate(10% ,0%)' }} className="w-full max-w-6xl bg-white p-4 rounded-md shadow-md mt-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Serial No.</th>
            <th className="border border-gray-300 px-4 py-2">Complaint ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Assigned To</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((complaint, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{complaint._id}</td>
                <td className="border border-gray-300 px-4 py-2">{complaint.title}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    complaint.status === 'progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.forwardedTo ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {complaint.forwardedTo}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs">Not Assigned</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => setSelectedComplaint(complaint)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                No complaints in this category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-5">Complaint Management System</h1>

      {renderComplaintsTable('New Complaints', newComplaints)}
      {renderComplaintsTable('Pending Complaints', pendingComplaints)}
      {renderComplaintsTable('Complaints in Progress', progressComplaints)}
      {renderComplaintsTable('Resolved Complaints', resolvedComplaints)}

      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-3/4 max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Complaint Details</h3>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Title</h4>
                <p className="mb-4 p-2 bg-gray-50 rounded">{selectedComplaint.title}</p>
                
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="mb-4 p-2 bg-gray-50 rounded">{selectedComplaint.description}</p>
                
                <h4 className="font-semibold mb-2">Status</h4>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedComplaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedComplaint.status === 'progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedComplaint.status}
                </span>
                
                {selectedComplaint.forwardedTo && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Currently Assigned To</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {selectedComplaint.forwardedTo}
                    </span>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Admin Remarks</h4>
                {selectedComplaint.remarksByWarden && (
                  <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-sm font-medium text-yellow-800">Warden:</p>
                    <p className="text-sm text-yellow-700">{selectedComplaint.remarksByWarden}</p>
                  </div>
                )}
                
                {selectedComplaint.remarksByEmployee && (
                  <div className="mb-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <p className="text-sm font-medium text-blue-800">Employee:</p>
                    <p className="text-sm text-blue-700">{selectedComplaint.remarksByEmployee}</p>
                  </div>
                )}
                
                {selectedComplaint.remarksByDeputyProvost && (
                  <div className="mb-3 p-3 bg-green-50 border-l-4 border-green-400 rounded">
                    <p className="text-sm font-medium text-green-800">Deputy Provost:</p>
                    <p className="text-sm text-green-700">{selectedComplaint.remarksByDeputyProvost}</p>
                  </div>
                )}
                
                {selectedComplaint.remarksByProvost && (
                  <div className="mb-3 p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                    <p className="text-sm font-medium text-purple-800">Provost:</p>
                    <p className="text-sm text-purple-700">{selectedComplaint.remarksByProvost}</p>
                  </div>
                )}
                
                {!selectedComplaint.remarksByWarden && 
                 !selectedComplaint.remarksByEmployee && 
                 !selectedComplaint.remarksByDeputyProvost && 
                 !selectedComplaint.remarksByProvost && (
                  <p className="text-gray-500 text-sm">No remarks yet from admin staff.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaint;
