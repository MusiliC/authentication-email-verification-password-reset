"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("Email verified");
      console.log(res.data);
    } catch (error: any) {
      setError(true);
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const getMe = async () => {
  //   try {
  //     const res = await axios.get("/api/users/me");
  //     console.log(res);
  //   } catch (error) {}
  // };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <section className="w-full min-h-[80vh] md:min-h-[100vh] flex justify-center items-center ">
      <div className="mainContainer">
        <div>
          <h2 className="p-3 bg-[#4f46e5]  mt-5 rounded-md ">
            <span className="text-[#ffff] font-semibold  md:text-lg tracking-[0.12rem]">
              {token
                ? `Welcome! to C-tech! Your email is verified`
                : "No token"}
            </span>
          </h2>
        </div>

        {verified && (
          <div className="mt-5 flex flex-col gap-3 items-center">
            <Link
              href={"/login"}
              className="underline text-base md:text-lg text-blue-900 font-semibold"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div>
            <h2 className="text-base md:text-lg p-2 bg-red-500 text-white">
              Error
            </h2>
          </div>
        )}
      </div>
      <Toaster />
    </section>
  );
}
