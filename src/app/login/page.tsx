"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
      toast.success("Login success, Welcome!");

      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(`Login failed - ${error.message}`);
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
    <section className="w-full min-h-[80vh] md:min-h-[100vh] flex justify-center items-center ">
      <div className="mainContainer">
        <h1 className="text-base md:text-lg font-bold text-center text-[#000]">
          {loading ? "Processing" : "Login"}{" "}
        </h1>

        <label htmlFor="username" className="text-sm md:text-base">
          Email
        </label>
        <input
          className="formInput"
          id="username"
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

        <button onClick={OnLogin} className="submit">
          {buttonDisabled ? "Enter Credentials" : " Login"}
        </button>
        <Toaster />

        <div className="flex mt-5 flex-col items-start gap-3  justify-start">
          <div className="flex gap-2 items-center">
            <p className="text-sm md:text-base">No account?</p>
            <Link
              href={"/signup"}
              className="underline text-sm md:text-base text-blue-900 font-semibold"
            >
              Create Account
            </Link>
          </div>

          <Link
            href={"/forgotpassword"}
            className="underline text-sm md:text-base text-blue-900 font-semibold"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
