import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async () => {
    try {
      const response = await axios.get("/api/user/profile", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(response.data.data);
      } else {
        toast.error("Failed to fetch user data.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong fetching profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user)
    return (
      <div className="text-center mt-10 text-red-500">
        User not found or not logged in.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.profileImage || "/default-avatar.png"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-2 border-orange-500 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded shadow">
          <h4 className="text-gray-600 text-sm">Name</h4>
          <p className="text-lg font-semibold text-gray-800">{user.name}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded shadow">
          <h4 className="text-gray-600 text-sm">Email</h4>
          <p className="text-lg font-semibold text-gray-800">{user.email}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded shadow">
          <h4 className="text-gray-600 text-sm">Joined</h4>
          <p className="text-lg font-semibold text-gray-800">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {user.role && (
          <div className="p-4 bg-gray-50 rounded shadow">
            <h4 className="text-gray-600 text-sm">Role</h4>
            <p className="text-lg font-semibold text-gray-800 capitalize">
              {user.role}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
