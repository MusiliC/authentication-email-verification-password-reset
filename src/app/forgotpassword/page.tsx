"use client";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const sendEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.post("api/users/forgotpassword", { email });
      toast.success("Success! Check your email");
      console.log("Success", res.data);
      router.push("/success");
    } catch (error: any) {
      console.log("Forgot password failed", error.message);
      toast.error(`Forgot password failed -  ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-[100vh] flex justify-center items-center ">
      <div className="mainContainer">
        <h1 className="text-base md:text-lg font-bold text-center text-[#000]">
          {loading ? "Processing" : "Your Email"}{" "}
        </h1>

        <br />

        <label htmlFor="username text-sm md:text-base">
          Enter the email with your account:
        </label>
        <input
          className="formInput"
          id="username"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <div className="my-1 mt-5">
          <button onClick={sendEmail} className="submit">
            Submit
          </button>

          <Link
            href={"/login"}
            className="text-sm md:text-base underline text-blue-900 font-semibold mt-5"
          >
            Back to login
          </Link>
        </div>
        <Toaster />
      </div>
    </section>
  );
}

export default ForgotPassword;
