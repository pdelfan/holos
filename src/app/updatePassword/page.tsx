"use client";

import { useState } from "react";
import Image from "next/image";
import LoadingIcon from "@/assets/icons/loadingIcon.svg";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import Label from "@/components/inputs/label/Label";

export default function UpdatePassword() {
  const supabase = createClientComponentClient<Database>();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUpdatePassword = async () => {
    setLoading(true);
    try {
      // if it's called for an alraedy confirmed user, it will return 'User already registered'
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
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
        Create a new password
      </h1>
      <h2 className="text-sm font-medium text-gray-500 dark:text-neutral-400">
        Your new password must be different from your previous password.
      </h2>
      <form
        className="text-sm font-medium text-gray-400 mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdatePassword();
        }}
      >
        <Label htmlFor="password">New Password</Label>
        <input
          required
          type="password"
          name="new password"
          className="px-4 py-2.5 bg-input rounded-xl mt-1 w-full text-gray-600 focus:outline-gray-400"
          placeholder="new password"
          value={password}
          onChange={(e) => {
            setError("");
            setSuccess(false);
            setPassword(e.target.value);
          }}
        />
        {!success && error && (
          <small className="block text-red-500 font-medium mt-1 animate-fade dark:text-red-400">
            {error}
          </small>
        )}
        {success && (
          <small className="block text-green-600 font-medium mt-1 animate-fade dark:text-green-500">
            Your password was updated successfully!
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
          {loading && "Updating your password..."}
          {!loading && !success && "Update password"}
          {!loading && success && "Password was updated!"}
        </button>
      </form>
    </section>
  );
}
