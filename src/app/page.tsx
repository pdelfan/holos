import Image from "next/image";
import LandingBackground from "@/assets/images/landingBackgroundBlurred.png";
import LandingScreenshot from "@/assets/images/landingScreenshot.png";
import Logo from "@/assets/logo.svg";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Image
        className="min-h-screen object-cover"
        src={LandingBackground}
        alt="Wide shot of a mountain covered in snow"
        fill={true}
        objectFit="cover"
      />
      <section className="relative min-h-screen flex flex-col place-items-center justify-center ">
        <Image src={Logo} alt="Holos logo" width={60} height={60} />
        <h1 className="text-white text-4xl font-semibold mt-3">
          Head into the wild, prepared
        </h1>
        <h2 className="text-white font-semibold mt-3 max-w-full sm:max-w-sm">
          Plan your hikes with confidence. Organize your gear essentials,
          prioritize must-haves, and build the perfect pack for every trek.
        </h2>
        <div className="flex gap-3 mt-6">
          <a
            href=""
            className="group bg-orange text-white text-md font-medium p-3 rounded-full hover:bg-orange-dark"
          >
            Get Started {""}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </a>
          <a
            href=""
            className="bg-gray-100 text-black text-md font-medium p-3 rounded-full hover:bg-gray-200"
          >
            Sign In
          </a>
        </div>
      </section>
    </main>
  );
}
