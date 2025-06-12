import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/authSlice.js";
import { toast } from "react-toastify";
import Logout from "./Logout.jsx";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.isLoggedIn); // Adjust if your slice is different

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Logo + Dropdown */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-orange-600">
            Eventify
          </Link>

          <div
            className="relative group cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center gap-1 text-gray-700 font-medium hover:text-orange-600">
              Browse Events
              <ChevronDown size={16} />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-8 left-0 bg-white border shadow-lg p-3 w-48 space-y-2 rounded z-10">
                <Link
                  to="/events"
                  className="block text-gray-700 hover:text-orange-600"
                >
                  All Events
                </Link>
                <Link
                  to="/categories"
                  className="block text-gray-700 hover:text-orange-600"
                >
                  By Category
                </Link>
                <Link
                  to="/cities"
                  className="block text-gray-700 hover:text-orange-600"
                >
                  By City
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-full w-1/3">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for events"
            className="bg-transparent w-full px-2 py-1 text-sm focus:outline-none"
          />
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Logout />
              <Link
                to="/create"
                className="text-sm font-medium text-orange-600 hover:underline"
              >
                Create Event
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:text-orange-600"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-orange-600 text-white text-sm px-4 py-1 rounded-full hover:bg-orange-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
