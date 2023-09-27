"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Button from "@/components/actions/button/Button";
import useGetUser from "@/hooks/useGetUser";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Settings() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const { user, isLoading } = useGetUser();

  const onUpdateEmail = async () => {
    if (newEmail === user) {
      toast.error("New email cannot be the same as your current email.");
      return;
    }

    setLoading(true);

    try {
      const { data: user, error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        toast.error("Couldn't update email.");
      }

      if (user) {
        toast.success("Updated email. Please confirm your new email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1">Settings</h1>
      <section className="flex flex-col flex-wrap gap-12 justify-center items-center mt-8">
        <div className="flex flex-col items-center gap-2">
          <Avatar name={user} size="large" />
          {isLoading && (
            <div className="mt-1 h-4 w-32 bg-gray-300 rounded-xl col-span-2"></div>
          )}
          {user && <h2 className="font-medium text-md text-gray">{user}</h2>}
        </div>

        <div className="max-w-xs">
          <h2 className="font-medium">Update Email</h2>
          <p className="mt-1 mb-4">
            After changing your email, we will send a confirmation link to{" "}
            <u>both your current and new email</u>. You will need to confirm
            both.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdateEmail();
            }}
          >
            <label htmlFor="email" className="text-gray-light">
              Email
            </label>
            <input
              autoFocus
              required
              id="email"
              type="email"
              name="email"
              className="px-4 py-2.5 bg-input rounded-xl mt-1 mb-4 w-full text-gray-600 focus:outline-gray-400 focus:bg-input-focus"
              placeholder="new@email.com"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
            />
            <button
              type="submit"
              className="rounded-lg bg-zinc-600 text-gray-100 text-sm font-medium px-4 py-2 border hover:bg-zinc-700"
              disabled={loading}
              aria-disabled={loading}
            >
              Update Email
            </button>
          </form>
        </div>

        <div className="max-w-xs">
          <h2 className="font-medium">Reset Password</h2>
          <p className="mt-1 mb-4">
            You will receive a link to reset your password in your email.            
          </p>
          <Button>Reset Password</Button>
        </div>

        <div className="max-w-xs">
          <h2 className="font-medium">Delete Profile</h2>
          <p className="mt-1 mb-4">
            Delete your account and all the data connected to it. This is not
            reversible.
          </p>
          <Button>Delete Profile</Button>
        </div>
      </section>
    </>
  );
}
