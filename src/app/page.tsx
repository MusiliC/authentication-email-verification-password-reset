import Image from "next/image";
import Link from "next/link";
import homeImage from "@/assets/1.svg";

export default function Home() {
  return (
    <section className="w-full min-h-[100vh] flex justify-center items-center">
      <div className="w-5/6 mx-auto flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* welcome */}
        <div className="flex-1">
          <Image src={homeImage} alt="home" />
        </div>
        <div className="flex-1">
          <div className="md:w-5/6 mx-auto flex flex-col gap-6">
            <p className="text-lg">
              A Next.js-based user authentication system utilizing JWT for user
              authentication, featuring email verification and secure password
              reset functionalities.
              <br />
              <br />
              Also implementing protected routing using middleware routing
            </p>

            <div className="">
              <Link href={"/login"}>
                <button className="submit">Get started</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
