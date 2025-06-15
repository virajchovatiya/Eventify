import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <AuthLayout isAuthenticated={false}>
        <SignUp />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout isAuthenticated={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/verify-otp",
    element: (
      <AuthLayout isAuthenticated={false}>
        <VerifyOTP />
      </AuthLayout>
    ),
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: (
          <AuthLayout isAuthenticated={true}>
            <Profile />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <RouterProvider router={router} />
      </>
    </Provider>
  </StrictMode>
);
