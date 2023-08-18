"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const OnSignUp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("api/users/signup", user);
      console.log("Sign up success", res.data);
      toast.success("Sign up success!, Check Your email to verify");
      router.push("/success");
    } catch (error: any) {
      console.log("Sign up failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <section className="w-full min-h-[80vh] md:min-h-[100vh] flex justify-center items-center ">
      <div className="mainContainer">
        <h1 className="text-sm md:text-lg font-bold text-center text-[#000]">
          {loading ? "Processing" : "Sign Up"}{" "}
        </h1>
        <br />
        <label htmlFor="username" className="text-sm md:text-base">
          Username
        </label>
        <input
          className="formInput"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />

        <label htmlFor="username" className="text-sm md:text-base">
          Email
        </label>
        <input
          className="formInput"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label htmlFor="username" className="text-sm md:text-base">
          Password
        </label>
        <input
          className="formInput"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <button onClick={OnSignUp} className="submit">
          {buttonDisabled ? "Enter Credentials" : " Sign Up"}
        </button>

        <Link
          href={"/login"}
          className="underline text-sm md:text-base text-blue-900 font-semibold mt-5"
        >
          Back to login
        </Link>
      </div>
      <Toaster />
    </section>
  );
};

export default SignUp;
