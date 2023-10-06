"use client";

import { useState } from "react";
import Image from "next/image";
import LoadingIcon from "@/assets/icons/loadingIcon.svg";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";

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
        console.log(error);
        setError(error.message);
      } else {
        setSuccess(true);
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
        Welcome to Holos
      </h1>
      <h2 className="text-sm font-medium text-gray-500 dark:text-neutral-400">
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
              setSuccess(false);
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
              setSuccess(false);
              setPassword(e.target.value);
            }}
          />
        </span>
        {!success && error && (
          <small className="block text-red-500 font-medium mt-1 animate-fade dark:text-red-500">
            {error}
          </small>
        )}
        {success && (
          <small className="block text-green-600 font-medium mt-1 animate-fade dark:text-green-500">
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
