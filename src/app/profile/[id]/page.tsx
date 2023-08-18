"use client";

import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function UserProfile({ params }: any) {
  const router = useRouter();

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
  return (
    <section className="w-full min-h-[100vh] flex justify-center items-center ">
      <div className="mainContainer">
        <h1 className="text-base md:text-lg font-bold text-center text-[#000]">
          UserProfile Page
        </h1>
        <hr />
        <br />
        <p className="text-lg md:text-xl ">
          This is your user token <br /> <br />
          <span className="font-semibold text-xl tracking-wider">
            {params.id}
          </span>
        </p>

        <br />

        <div className="flex justify-center items-center">
          <Link href={"/profile"}>
            <button className="submit">Back to Profile</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
