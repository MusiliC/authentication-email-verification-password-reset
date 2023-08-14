import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full min-h-[100vh] flex justify-center items-center">
      <div className="w-5/6 mx-auto flex md:flex-row items-center justify-center gap-10">
        {/* welcome */}
        <div className="flex-1">
          <img src="" alt="" />
        </div>
        <div className="flex-1">
          <div className="w-5/6 mx-auto flex flex-col gap-6">
            <p className="text-lg">
              A Next.js-based user authentication system utilizing JWT for user
              authentication, featuring email verification and secure password
              reset functionalities.
            </p>

            <div className="">
              <button className="submit">
                <Link href={"/login"}>Get started</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
