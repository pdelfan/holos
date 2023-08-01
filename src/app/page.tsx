import Image from "next/image";
import LandingImage from "@/assets/images/landingImage.png";
import Logo from "@/assets/logo.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <section className="relative flex flex-col place-items-center justify-center text-center p-3 mt-5 animate-fade animate-duration-200">
        <Image
          src={Logo}
          alt="Holos logo"
          width={60}
          height={60}
          className="animate-fade-down animate-duration-700 animate-delay-100"
        />
        <h1 className="text-header-1 text-4xl sm:text-5xl font-medium mt-3 animate-fade-down animate-duration-700 animate-delay-150">
          Head into the wild, <em>prepared</em>
        </h1>
        <h2 className="text-header-2 text-md sm:text-lg font-medium mt-3 max-w-full sm:max-w-lg animate-fade-down animate-duration-700 animate-delay-150">
          Plan your hikes with confidence. Organize your gear essentials,
          prioritize must-haves, and build the perfect pack for every trek.
        </h2>
        <div className="flex gap-3 mt-6 animate-fade-up animate-duration-700 animate-delay-200">
          <Link
            href="/signUp"
            className="group bg-orange text-white text-md font-medium px-5 py-3 rounded-full hover:bg-orange-dark"
          >
            Get Started {""}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </Link>
          <Link
            href="/signIn"
            className="bg-gray-100 text-gray-600 text-md font-medium px-5 py-3 rounded-full hover:bg-gray-200"
          >
            Sign In
          </Link>
        </div>
        <Image
          className="animate-fade-up mt-12"
          src={LandingImage}
          alt="Illustration of hikers on a path that is made up of the letters H-O-L-O-S"
          width={900}
        />
      </section>
    </main>
  );
}
