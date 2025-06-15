import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ChevronDown, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/authSlice.js";
import { toast } from "react-toastify";
import Logout from "./Logout.jsx";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const user = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo + Dropdown */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-orange-600">
            Eventify
          </Link>

          <div
            ref={dropdownRef}
            className="relative group cursor-pointer hidden md:block"
          >
            <div
              className="flex items-center gap-1 text-gray-700 font-medium hover:text-orange-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Browse Events
              <ChevronDown size={16} />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-8 left-0 bg-white border shadow-lg p-3 w-48 space-y-2 rounded z-10">
                <Link to="/events" className="block hover:text-orange-600">
                  All Events
                </Link>
                <Link to="/categories" className="block hover:text-orange-600">
                  By Category
                </Link>
                <Link to="/cities" className="block hover:text-orange-600">
                  By City
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-full w-1/3">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for events"
            className="bg-transparent w-full px-2 py-1 text-sm focus:outline-none"
          />
        </div>

        {/* Auth & Menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Logout />
              <Link
                to="/create"
                className="text-sm font-medium text-orange-600 hover:underline hidden md:inline"
              >
                Create Event
              </Link>
              <Link
                to="/profile"
                className="text-sm font-medium hover:text-orange-600 hidden md:inline"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:text-orange-600 hidden md:inline"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="hidden md:inline bg-orange-600 text-white text-sm px-4 py-1 rounded-full hover:bg-orange-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search events"
              className="bg-transparent w-full px-2 py-1 text-sm focus:outline-none"
            />
          </div>

          <Link to="/events" className="block hover:text-orange-600">
            All Events
          </Link>
          <Link to="/categories" className="block hover:text-orange-600">
            By Category
          </Link>
          <Link to="/cities" className="block hover:text-orange-600">
            By City
          </Link>

          {user ? (
            <>
              <Link
                to="/create"
                className="block text-orange-600 font-medium"
              >
                Create Event
              </Link>
              <Link to="/profile" className="block hover:text-orange-600">
                Profile
              </Link>
              <Logout />
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-orange-600">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block bg-orange-600 text-white px-4 py-1 rounded-full text-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
