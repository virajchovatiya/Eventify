import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";

function VerifyOTP() {
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const verifyOtp = async (data) => {
    setError("");
    try {
      const response = await axios.post("/api/user/verify-otp", {
        email,
        otp: Number(data.otp),
      });

      if (response.status === 200 && location.state?.origin === "signup") {
        toast.success("OTP verified! You can now log in.");
        navigate("/login");
      } else {
        setError(response.data.message || "Invalid OTP");
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("An error occurred while verifying OTP.");
      toast.error("An error occurred while verifying OTP.");
    }
  };

  const resendOtp = async () => {
    setError("");
    setResendLoading(true);
    try {
      const response = await axios.post("/api/user/resend-otp", { email });
      if (response.status === 200) {
        toast.success("OTP resent successfully! Please check your email.");
      } else {
        setError(response.data.message || "Failed to resend OTP");
        toast.error(response.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError("An error occurred while resending OTP.");
      toast.error("An error occurred while resending OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-100 to-orange-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-3">
          Verify Email
        </h2>
        <p className="text-center text-gray-700 text-sm mb-6">
          Enter the OTP sent to{" "}
          <span className="font-medium text-black">{email}</span>
        </p>

        <form onSubmit={handleSubmit(verifyOtp)} className="space-y-4">
          <Input
            label="OTP"
            type="text"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            {...register("otp", { required: "OTP is required" })}
          />
          {errors.otp && (
            <div className="text-red-500 text-sm">{errors.otp.message}</div>
          )}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Didn't get the OTP?{" "}
            <button
              onClick={resendOtp}
              disabled={resendLoading}
              className={`font-semibold text-orange-600 hover:underline transition ${
                resendLoading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
