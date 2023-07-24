"use client";

import { useState } from "react";
import Image from "next/image";
import LoadingIcon from "@/assets/icons/loadingIcon.svg";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

export default function SignUp() {
  const supabase = createClientComponentClient<Database>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // if it's called for an alraedy confirmed user, it will return 'User already registered'
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.log(error)
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white border rounded-2xl max-w-xs p-5">
      <Link
        href="/"
        className="flex h-10 w-10 items-center justify-center font-medium text-lg bg-button p-2 rounded-full hover:bg-button-hover"
      >
        {"<-"}
      </Link>
      <h1 className="text-xl font-semibold text-gray-800 mb-1 mt-3">
        Welcome to Holos
      </h1>
      <h2 className="text-sm font-medium text-gray-500">
        After you have signed up, check your email for a verification link to
        complete your registration.
      </h2>
      <form
        className="text-sm font-medium text-gray-400 mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        <label htmlFor="email" className="text-gray-light">
          Email
        </label>
        <input
          autoFocus
          required
          type="email"
          name="email"
          className="px-4 py-2.5 bg-input rounded-xl mt-1 w-full text-gray-600 focus:outline-gray-400"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setError("");
            setSuccess(false);
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password" className="inline-block text-gray-light mt-3">
          Password
        </label>
        <input
          required
          type="password"
          name="password"
          className="px-4 py-2.5 bg-input rounded-xl mt-1 w-full text-gray-600 focus:outline-gray-400"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setError("");
            setSuccess(false);
            setPassword(e.target.value);
          }}
        />
        {!success && error && (
          <small className="block text-red-500 font-medium mt-1 animate-fade">
            {error}            
          </small>
        )}
        {success && (
          <small className="block text-green-600 font-medium mt-1 animate-fade">
            Check your email ({email}) to verify your account!
          </small>
        )}
        <button
          type="submit"
          className={`flex items-center gap-2 justify-center ${
            !success && "bg-orange hover:bg-orange-dark"
          } ${
            success && "bg-green-600"
          } text-white font-semibold rounded-lg px-3 py-3 mt-5 w-full disabled:cursor-not-allowed`}
          disabled={loading || success}
          aria-disabled={loading || success}
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
          {loading && "Signing Up..."}
          {!loading && !success && "Sign Up"}
          {!loading && success && "Signed Up!"}
        </button>
      </form>
    </section>
  );
}
