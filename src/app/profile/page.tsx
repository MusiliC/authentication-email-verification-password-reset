"use client";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
      setUsername(res.data.data.username);
      setEmail(res.data.data.email);
      toast.success("Successful");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-[100vh] flex justify-center items-center ">
      <div className="mainContainer">
        <h1 className="text-base md:text-lg font-bold text-center text-[#000]">
          {loading ? "Processing" : " Profile Page"}
        </h1>
        <h2 className="font-semibold text-sm md:text-base mt-5">
          {data === "nothing" ? (
            "Click the button below to get user details!"
          ) : (
            <Link href={`/profile/${data}`}>Your Credentials</Link>
          )}
        </h2>
        <br />

        <div className="flex flex-col gap-2">
          <p className="text-sm md:text-base">Username: {username}</p>
          <p className="text-sm md:text-base">Email: {email}</p>
        </div>

        <br />

        <div>
          <button onClick={getUserDetails} className="submit">
            Get User Details
          </button>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={logOut}
            className="p-3 my-4 border bg-gray-200 rounded-md mb-4 hover:outline-none hover:bg-gray-400"
          >
            Log out
          </button>
        </div>
        <Toaster />
      </div>
    </section>
  );
}

export default Profile;
