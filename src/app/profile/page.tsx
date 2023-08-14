"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const [username, setUsername] = React.useState("");

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
    setUsername(res.data.data.username);
  };

  return (
    <section className="w-full min-h-[100vh] flex justify-center items-center ">
      <div className="mainContainer">
        <h1 className="text-lg font-bold text-center text-[#000]">
          Profile Page
        </h1>
        <h2 className="p-2  mt-5">
          {data === "nothing" ? (
            "Click the button below to get user details!"
          ) : (
            <Link href={`/profile/${data}`}>
              Your username is{" "}
              <span className="font-semibold text-xl text-blue-700 tracking-widest">
                {username}
              </span>
            </Link>
          )}
        </h2>
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
      </div>
    </section>
  );
}

export default Profile;
