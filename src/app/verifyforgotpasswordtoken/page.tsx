"use client";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function VerifyForgotPassword() {
  const [token, setToken] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const resetPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        setLoading(true);
        await axios.post("/api/users/resetpassword", { token, newPassword });
        console.log(token);
      } catch (error: any) {
        console.log("Password reset failed", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Password does not match");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen py-2">
      <h1>{loading ? "Processing" : "Musili@gmail.com"} </h1>

      <br />

      <label htmlFor="username">Enter new password:</label>
      <input
        className="p-3 my-1 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="new password"
      />
      <label htmlFor="username">Confirm New Password:</label>
      <input
        className="p-3 my-1 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="confirm new password"
      />

      <button
        onClick={resetPassword}
        className="p-3 border bg-gray-200 rounded-md mb-4 hover:outline-none hover:bg-gray-400"
      >
        Submit
      </button>
    </div>
  );
}

export default VerifyForgotPassword;
