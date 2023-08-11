"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const OnLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("api/users/login", user);
      console.log("Login success", res.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"} </h1>
      <hr />

      <label htmlFor="username">email</label>
      <input
        className="p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="username">password</label>
      <input
        className="p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={OnLogin}
        className="p-3 border bg-gray-200 rounded-md mb-4 hover:outline-none hover:bg-gray-400"
      >
        {buttonDisabled ? "No login" : " Login"}
      </button>

      <div className="flex flex-col items-start gap-5  justify-start">
        <Link href={"/signup"} className="underline">
          Create Account
        </Link>

        <Link href={"/reset"} className="underline">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
