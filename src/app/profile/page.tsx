"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

  const logOut = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <h2 className="p-2 rounded-md bg-green-200">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />

      <button
        onClick={logOut}
        className="p-3 my-4 border bg-gray-200 rounded-md mb-4 hover:outline-none hover:bg-gray-400"
      >
        Log out
      </button>
      <button
        onClick={getUserDetails}
        className="p-3 border bg-green-600 rounded-md mb-4 hover:outline-none hover:bg-gray-300"
      >
        Get User Details
      </button>
    </div>
  );
}

export default Profile;
