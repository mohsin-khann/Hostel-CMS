import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import API from "../../api/api";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMapMarkerAlt,
  faEdit,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import AdminLayout from "./AdminLayout";
import Sidebar from "./Sidebar";

const Account = () => {
  const { userId } = useContext(AppContext);
  const navigate = useNavigate();

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // fetch user
  const getUser = async () => {
    try {
      const res = await API.get(`/user/getUser/${userId}`);
      setUserInfo(res.data.user);
    } catch {
      toast.error("Cannot fetch user data");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((p) => ({ ...p, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const res = await API.put(`/user/updateUser/${userId}`, formData);
      setUserInfo(res.data.user);
      setIsEditing(false);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.password !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await API.put(`/user/resetPass/${userId}`, passwordData);
      toast.success("Password updated");
      setIsUpdatingPassword(false);
      navigate("/");
    } catch {
      toast.error("Password update failed");
    }
  };

  return (
    <AdminLayout sidebar={<Sidebar />}>
      {/* LEFT ALIGNED CONTENT */}
      <div className="w-full max-w-4xl">
        <div className="rounded-xl bg-white p-8 shadow">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faUser}
                className="text-indigo-600 text-3xl"
              />
              <div>
                <p className="text-xl font-semibold">
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  UserID: {userId}
                </p>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit
              </button>
            )}
          </div>

          {/* VIEW MODE */}
          {!isEditing ? (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-green-600 text-xl"
                />
                <p className="text-lg">{userInfo.email}</p>
              </div>

              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-red-600 text-xl"
                />
                <p className="text-lg">
                  {userInfo.address || "No address"}
                </p>
              </div>
            </div>
          ) : (
            /* EDIT MODE */
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleInputChange}
                placeholder="First Name"
                className="rounded border px-4 py-2"
              />
              <input
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="rounded border px-4 py-2"
              />
              <input
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="Email"
                className="rounded border px-4 py-2 md:col-span-2"
              />
              <textarea
                name="address"
                value={formData.address || ""}
                onChange={handleInputChange}
                placeholder="Address"
                className="rounded border px-4 py-2 md:col-span-2"
              />

              <div className="flex gap-3 md:col-span-2">
                <button
                  onClick={() => {
                    setFormData(userInfo);
                    setIsEditing(false);
                  }}
                  className="rounded bg-gray-300 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="rounded bg-indigo-600 px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* PASSWORD */}
          <button
            onClick={() => setIsUpdatingPassword((p) => !p)}
            className="mt-8 w-full rounded bg-black px-4 py-2 text-white"
          >
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            Change Password
          </button>

          {isUpdatingPassword && (
            <div className="mt-4 space-y-3 rounded bg-gray-100 p-4">
              <input
                type="password"
                name="password"
                value={passwordData.password}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="w-full rounded border px-4 py-2"
              />
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
                className="w-full rounded border px-4 py-2"
              />
              <button
                onClick={handlePasswordUpdate}
                className="w-full rounded bg-black px-4 py-2 text-white"
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Account;
