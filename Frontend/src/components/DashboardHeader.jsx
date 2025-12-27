import { useState } from 'react';
import axios from 'axios';

const Headers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [, setErrors] = useState({ title: '', description: '' });

  const HandleComplaints = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setFile(null);
    setErrors({ title: '', description: '' });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const validateForm = () => {
    const newErrors = { title: '', description: '' };
    let valid = true;

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) formData.append('attachment', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Not logged in');

      await axios.post(
        'http://localhost:3000/api/v1/complaint/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Complaint submitted successfully!');
      closeModal();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Failed to submit complaint');
    }
  };

  return (
    <>
      <header className="bg-gray-700 text-white px-4 py-3 shadow-md w-full">
        <div className="flex justify-between items-center max-w-full">

          <h2 className="text-xl font-semibold">User Dashboard</h2>

          <button
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            onClick={HandleComplaints}
          >
            New Complaint
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Complaint Form</h2>

            <form onSubmit={handleSubmit}>
              <input
                className="w-full mb-3 p-2 border rounded text-black"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="w-full mb-3 p-2 border rounded text-black"
                placeholder="Description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="file"
                className="mb-3"
                onChange={handleFileChange}
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Headers;
