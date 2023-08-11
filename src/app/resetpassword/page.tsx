"use client";
import React from "react";

function ResetPassword() {
  const [user, setUser] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = React.useState("");

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen py-2">
      <h1>{loading ? "Processing" : "Musili@gmail.com"} </h1>

      <br />

      <label htmlFor="username">Enter new password:</label>
      <input
        className="p-3 my-1 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="new password"
      />
      <label htmlFor="username">Confirm New Password:</label>
      <input
        className="p-3 my-1 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        placeholder="confirm new password"
      />

      <button className="p-3 border bg-gray-200 rounded-md mb-4 hover:outline-none hover:bg-gray-400">
        Submit
      </button>
    </div>
  );
}

export default ResetPassword;
