"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const sendEmail = async () => {
    try {
      setLoading(true);

      const res = await axios.post("api/users/forgotpassword", { email });
      console.log("Success", res.data);
    } catch (error: any) {
      console.log("Forgot password failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen py-2">
      <h1>{loading ? "Processing" : "Your Email"} </h1>

      <br />

      <label htmlFor="username">Enter the email with your account:</label>
      <input
        className="p-3 my-1 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <button
        onClick={sendEmail}
        className="p-3 border bg-gray-200 rounded-md mb-4 hover:outline-none hover:bg-gray-400"
      >
        Submit
      </button>
    </div>
  );
}

export default ForgotPassword;
