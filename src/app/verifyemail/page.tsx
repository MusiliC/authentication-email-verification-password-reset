"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      console.log(res.data);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

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
    <section className="w-full min-h-[100vh] flex justify-center items-center ">
      <div className="mainContainer">
        <div>
          <h1 className="text-lg font-bold text-center text-[#000]">
            Verify Email
          </h1>
          <h2 className="p-3 bg-[#4f46e5]  mt-5 rounded-md ">
            <span className="text-[#ffff] font-semibold text-lg tracking-[0.12rem]">
              {token ? `Welcome Brian Musili` : "No token"}
            </span>
          </h2>
        </div>

        {verified && (
          <div className="mt-5 flex flex-col gap-3">
            <h2 className="text-lg">Your Email is verified</h2>
            <Link
              href={"/login"}
              className="underline  text-blue-900 font-semibold"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div>
            <h2 className="text-lg p-2 bg-red-500 text-white">Error</h2>
          </div>
        )}
      </div>
    </section>
  );
}
