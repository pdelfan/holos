import Image from "next/image";
import LandingBackground from "@/assets/images/landingBackgroundBlurred.png";
import Logo from "@/assets/logo.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center align-middle justify-center min-h-screen ">
      <Image
        className=" object-cover animate-fade animate-duration-200"
        src={LandingBackground}
        alt="Wide shot of a mountain covered in snow"
        fill={true}        
      />
      <section className="relative flex flex-col place-items-center justify-center text-center p-3 animate-fade animate-duration-200">
        <Image
          src={Logo}
          alt="Holos logo"
          width={60}
          height={60}
          className="animate-fade-down animate-duration-700 animate-delay-100"
        />
        <h1 className="text-white text-4xl sm:text-5xl font-semibold mt-3 animate-fade-down animate-duration-700 animate-delay-150">
          Head into the wild, prepared
        </h1>
        <h2 className="text-white text-md sm:text-lg font-semibold mt-3 max-w-full sm:max-w-lg animate-fade-down animate-duration-700 animate-delay-150">
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
              {"->"}
            </span>
          </Link>
          <Link
            href="/signIn"
            className="bg-gray-100 text-gray-600 text-md font-medium px-5 py-3 rounded-full hover:bg-gray-200"
          >
            Sign In
          </Link>
        </div>
      </section>
    </main>
  );
}
