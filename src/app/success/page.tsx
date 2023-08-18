import Link from "next/link";
import React from "react";
import { FcApproval } from "react-icons/fc";

const Success = () => {
  return (
    <section className="w-full min-h-[90vh] flex justify-center items-center">
      <div className="bg-white w-[90%] mx-auto px-4 md:w-1/2 lg:w-1/4 rounded-md py-10">
        <div className=" flex flex-col items-center justify-center">
          <h1 className="md:text-lg">Success! </h1>{" "}
          <h2>
            <FcApproval size={30} />
          </h2>
        </div>
        <br />
        <div className="mt-2 flex flex-col items-center justify-center">
          <p className="text-sm md:text-base">
            Check your email to complete the process
          </p>
        </div>
      </div>
    </section>
  );
};

export default Success;
