import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout, login } from "../store/authSlice.js";

function AuthLayout({ children, isAuthenticated = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/user/checkAuth", {
        withCredentials: true, // Needed for cookie-based auth
      });
      console.log(res.data.data);
      if (res.status === 200 && res.data?.data) {
        dispatch(login(res.data.data)); // set userData from backend response
      } else {
        dispatch(logout());
      }
    } catch (err) {
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated && authStatus !== isAuthenticated) {
      navigate("/login");
    } else if (!isAuthenticated && authStatus !== isAuthenticated) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, isAuthenticated, loading]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
