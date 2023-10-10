"use client";

import { useState } from "react";
import Image from "next/image";
import LoadingIcon from "@/assets/icons/loadingIcon.svg";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";

export default function SignIn() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    try {
      // if it's called for an alraedy confirmed user, it will return 'User already registered'
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {        
        setError(error.message);
      } else {
        router.push("/dashboard/packs");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-white border rounded-2xl max-w-xs p-5 dark:bg-neutral-700 dark:border-neutral-600">
      <Link
        href="/"
        className="flex h-10 w-10 items-center justify-center font-medium text-lg bg-button p-2 rounded-full hover:bg-button-hover"
      >
        {"<-"}
      </Link>
      <h1 className="text-xl font-semibold text-gray-800 mb-1 mt-3 dark:text-neutral-100">
        Welcome Back
      </h1>
      <h2 className="text-sm font-medium text-gray-500 dark:text-neutral-400">
        Forgot password? {""}
        <Link href="/resetPassword">
          <u>Click here</u>
        </Link>
      </h2>
      <form
        className="text-sm font-medium text-gray-400 mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <span>
          <Label htmlFor="email">Email</Label>
          <Input
            autoFocus
            required
            type="email"
            name="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
          />
        </span>
        <span className="block mt-3">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />
        </span>
        {error && (
          <small className="block text-red-500 font-medium mt-1 animate-fade dark:text-red-400">
            {error}
          </small>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 justify-center bg-orange hover:bg-orange-dark text-white font-semibold rounded-lg px-3 py-3 mt-5 w-full disabled:cursor-not-allowed"
          disabled={loading}
          aria-disabled={loading}
        >
          {loading && (
            <Image
              src={LoadingIcon}
              alt="Loading icon"
              className="animate-spin"
              width={20}
              height={20}
            />
          )}
          {loading && "Signing In..."}
          {!loading && "Sign In"}
        </button>
      </form>
    </section>
  );
}
