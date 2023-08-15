"use client";
import axios from "axios";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function VerifyForgotPassword() {
  const [token, setToken] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const resetPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        setLoading(true);
        await axios.post("/api/users/resetpassword", { token, newPassword });
        toast.success("Password set successful");
        router.push("/login");
        console.log(token);
      } catch (error: any) {
        console.log("Password reset failed", error.message);
        toast.error(`Password reset failed ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Password does not match");
      toast.error("Password does not macth");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken || "");
  }, []);

  return (
    <section className="w-full min-h-[100vh] flex justify-center items-center">
      <div className="mainContainer">
        <h1 className="text-lg font-bold text-center text-[#000]">
          {loading ? "Processing" : "Reset Password"}
        </h1>

        <br />

        <label htmlFor="username">Enter new password:</label>
        <input
          className="formInput"
          id="username"
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="new password"
        />
        <label htmlFor="username">Confirm New Password:</label>
        <input
          className="formInput"
          id="username"
          type="text"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm new password"
        />

        <div className="mt-5">
          <button onClick={resetPassword} className="submit">
            Submit
          </button>
        </div>
      </div>
      <Toaster />
    </section>
  );
}

export default VerifyForgotPassword;
