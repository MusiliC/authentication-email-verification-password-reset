import React from "react";
import Link from "next/link";


function Navbar() {
  return (
    <section className="w-full">
      <nav className="w-5/6 mx-auto p-6 justify-between  flex flex-col md:flex-row sticky top-0 drop-shadow-xl">
        <h1 className="text-2xl font-bold tracking-widest  grid place-content-center mb-2 md:mb-0">
          <Link href={"/"}>C-tech!</Link>
        </h1>

      </nav>
      <div className="border border-gray-500" />
    </section>
  );
}

export default Navbar;
