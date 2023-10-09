import Image from "next/image";
import LandingImage from "@/assets/images/landingImage.png";
import Logo from "@/assets/logo.svg";
import PackImage from "@/assets/images/packExample.png";
import TripsImage from "@/assets/images/tripsExample.png";
import InventoryImage from "@/assets/images/inventoryExample.png";
import WishlistImage from "@/assets/images/wishlistExample.png";
import PrivacyIcon from "@/assets/icons/lockIcon.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="relative flex flex-col place-items-center justify-center text-center p-3 mt-5 animate-fade animate-duration-200">
        <Image
          src={Logo}
          alt="Holos logo"
          width={60}
          height={60}
          className="animate-fade-down animate-duration-700 animate-delay-100"
        />
        <h1 className="text-header-1 text-4xl sm:text-5xl font-medium mt-3 animate-fade-down animate-duration-700 animate-delay-150 dark:text-white">
          Head into the wild, <em>prepared</em>
        </h1>
        <h2 className="text-header-2 text-md sm:text-lg font-medium mt-3 max-w-full sm:max-w-lg animate-fade-down animate-duration-700 animate-delay-150 dark:text-neutral-400">
          Plan your hikes with confidence. Organize your gear essentials,
          prioritize must-haves, and build the perfect pack for every trek.
        </h2>
        <div className="flex gap-3 mt-6 animate-fade-up animate-duration-700 animate-delay-200 ">
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
      <section className="flex flex-col flex-wrap gap-5 p-3 mt-10 max-w-7xl animate-delay-1000 animate-fade-up">
        <div className="bg-[#F7F7F7] p-6 rounded-xl flex flex-wrap xl:flex-nowrap gap-3 dark:bg-neutral-800">
          <div className="w-full sm:max-w-sm">
            <h3 className="font-semibold text-2xl text-header-1 dark:text-neutral-200">
              Packs
            </h3>
            <p className="font-medium  text-md text-header-2 mt-3 dark:text-neutral-400">
              Create your own pack and see how much you should be packing for
              your next trip.
            </p>
            <p className="font-medium  text-md text-header-2 mt-3 dark:text-neutral-400">
              Share your packs with your others to help them prepare for their
              next trip.
            </p>
          </div>
          <Image
            className="border-2 border-gray-200 rounded-xl animate-fade-up mx-auto mt-6 xl:mt-0"
            src={PackImage}
            alt="Illustration of a pack with several items inside"
            width={900}
          />
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="bg-[#F7F7F7] p-6 rounded-xl flex-1 min-w-[49%] dark:bg-neutral-800">
            <div>
              <h3 className="font-semibold text-2xl text-header-1 dark:text-neutral-200">
                Inventory
              </h3>
              <p className="font-medium  text-md text-header-2 mt-3 dark:text-neutral-400">
                Collect all your items in one place so you’ll know what you can
                bring with you.
              </p>
            </div>
            <Image
              className="border-2 border-gray-200 rounded-xl mt-6 mx-auto"
              src={InventoryImage}
              alt="Two inventory cards showing jackets along with their price and weight"
              width={660}
            />
          </div>
          <div className="bg-[#F7F7F7] p-6 rounded-xl flex-1 min-w-[49%] dark:bg-neutral-800">
            <h3 className="font-semibold text-2xl text-header-1 dark:text-neutral-200">
              Trips
            </h3>
            <p className="font-medium  text-md text-header-2 mt-3 dark:text-neutral-400">
              Look back on your journeys to find out how much you should be
              packing for your next trip.
            </p>
            <Image
              className="mt-6 mx-auto"
              src={TripsImage}
              alt="Two trip cards showing title of the trip"
              width={350}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="bg-[#F7F7F7] p-6 rounded-xl flex-1 min-w-[49%] dark:bg-neutral-800">
            <div>
              <h3 className="font-semibold text-2xl text-header-1 dark:text-neutral-200">
                Wishlist
              </h3>
              <p className="font-medium  text-md text-header-2 mt-3 dark:text-neutral-400">
                Save your favourite items for later, when you want to go
                shopping.
              </p>
            </div>
            <Image
              className="mt-6 mx-auto"
              src={WishlistImage}
              alt="Four wishlist items with their title and website link."
              width={660}
            />
          </div>
          <div className="bg-[#F7F7F7] p-6 rounded-xl flex-1 min-w-[49%] dark:bg-neutral-800">
            <h3 className="font-semibold text-2xl text-header-1 dark:text-neutral-200">
              Privacy
            </h3>
            <p className="font-medium  text-md text-header-2 mt-3 dark:text-neutral-400">
              Holos is developed by hikers like you for free and will remain
              free. Your data is yours and can be exported at any time.
            </p>
            <p className="font-medium  text-md text-header-2 mt-3 dark:text-neutral-400">
              If you enjoy using Holos, please consider supporting us. Your
              contribution will help us maintain and run the servers, work on
              new features, and improve your experience.{" "}
            </p>
            <Image
              className="animate-fade-up mt-12 mx-auto"
              src={PrivacyIcon}
              alt="Illustration of hikers on a path that is made up of the letters H-O-L-O-S"
              width={120}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
