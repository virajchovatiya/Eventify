import React from "react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import axios from "axios";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/user/logout");
      if (response.status === 200) {
        dispatch(logoutAction());
        toast.success("Logout successful!");
        navigate("/login");
      } else {
        toast.error("Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-full shadow transition duration-200"
    >
      Logout
    </button>
  );
}

export default Logout;
