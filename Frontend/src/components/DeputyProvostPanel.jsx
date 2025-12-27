import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';

const DeputyProvostPanel = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const fetchComplaints = useCallback(async () => {
        try {
            setLoading(true);
            const response = await API.get('/complaint/getAllComplaints');
            setComplaints(response.data.complaints);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching complaints:', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    const handleStatusUpdate = useCallback(async (complaintId) => {
        try {
            await API.put(`/complaint/update-status/${complaintId}`, { status });
            fetchComplaints();
            setStatus('');
            alert('Status updated successfully!');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    }, [status, fetchComplaints]);

    const handleAddRemarks = useCallback(async (complaintId) => {
        try {
            await API.put(`/complaint/remarks/deputyprovost/${complaintId}`, { remarks });
            fetchComplaints();
            setRemarks('');
            alert('Remarks added successfully!');
        } catch (error) {
            console.error('Error adding remarks:', error);
            alert('Failed to add remarks');
        }
    }, [remarks, fetchComplaints]);

    const handleForwardToProvost = useCallback(async (complaintId) => {
        try {
            await API.put(`/complaint/forward/${complaintId}`, { target: 'Provost' });
            fetchComplaints();
            alert('Complaint forwarded to Provost successfully!');
        } catch (error) {
            console.error('Error forwarding complaint:', error);
            alert('Failed to forward complaint');
        }
    }, [fetchComplaints]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading complaints...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Deputy Provost Dashboard</h1>
            
            {complaints.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No complaints assigned to you at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Complaints List */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Assigned Complaints</h2>
                        <div className="space-y-4">
                            {complaints.map((complaint) => (
                                <div key={complaint._id} className="border rounded-lg p-4 hover:bg-gray-50">
                                    <h3 className="font-semibold text-lg">{complaint.title}</h3>
                                    <p className="text-gray-600 text-sm mt-2">{complaint.description}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            complaint.status === 'progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {complaint.status}
                                        </span>
                                        <button
                                            onClick={() => setSelectedComplaint(complaint)}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Complaint Details and Actions */}
                    {selectedComplaint && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold">{selectedComplaint.title}</h3>
                                    <p className="text-gray-600 mt-2">{selectedComplaint.description}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Update Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full border rounded-md px-3 py-2"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="new">New</option>
                                        <option value="pending">Pending</option>
                                        <option value="progress">In Progress</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    <button
                                        onClick={() => handleStatusUpdate(selectedComplaint._id)}
                                        disabled={!status}
                                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Update Status
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Add Remarks
                                    </label>
                                    <textarea
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        className="w-full border rounded-md px-3 py-2 h-24"
                                        placeholder="Enter your remarks..."
                                    />
                                    <button
                                        onClick={() => handleAddRemarks(selectedComplaint._id)}
                                        disabled={!remarks.trim()}
                                        className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                                    >
                                        Add Remarks
                                    </button>
                                </div>

                                <div>
                                    <button
                                        onClick={() => handleForwardToProvost(selectedComplaint._id)}
                                        className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    >
                                        Forward to Provost
                                    </button>
                                </div>

                                {selectedComplaint.remarksByWarden && (
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <h4 className="font-medium text-sm">Warden Remarks:</h4>
                                        <p className="text-sm text-gray-600">{selectedComplaint.remarksByWarden}</p>
                                    </div>
                                )}

                                {selectedComplaint.remarksByEmployee && (
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <h4 className="font-medium text-sm">Employee Remarks:</h4>
                                        <p className="text-sm text-gray-600">{selectedComplaint.remarksByEmployee}</p>
                                    </div>
                                )}

                                {selectedComplaint.remarksByDeputyProvost && (
                                    <div className="bg-blue-50 p-3 rounded-md">
                                        <h4 className="font-medium text-sm">Your Previous Remarks:</h4>
                                        <p className="text-sm text-gray-600">{selectedComplaint.remarksByDeputyProvost}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DeputyProvostPanel;
