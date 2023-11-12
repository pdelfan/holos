"use client";

import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";
import useGetUserData from "@/hooks/useGetUserData";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Action = "emailUpdate" | "passwordReset";

interface LoadingState {
  [key: string]: boolean;
}

export default function Advanced() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<LoadingState>({});

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const { userData } = useGetUserData();
  const router = useRouter();

  const startLoading = (action: Action) => {
    setLoading((prev) => ({ ...prev, [action]: true }));
  };

  const stopLoading = (action: Action) => {
    setLoading((prev) => ({ ...prev, [action]: false }));
  };

  const onUpdateEmail = async () => {
    if (newEmail === userData?.email) {
      toast.error("New email cannot be the same as your current email.");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/");
      return;
    }

    startLoading("emailUpdate");

    try {
      const { data: updatedUser, error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        toast.error("Couldn't update email.");
      }

      if (updatedUser) {
        toast.success("Updated email. Please confirm your new email.");
      }
    } finally {
      stopLoading("emailUpdate");
    }
  };

  const onResetPassword = async () => {
    if (!userData?.email) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/");
      return;
    }

    startLoading("passwordReset");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        userData?.email,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/updatePassword`,
        }
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      setResetSuccess(true);
    } finally {
      stopLoading("passwordReset");
    }
  };

  return (
    <>
      {!userData && (
        <div className="flex flex-col gap-2 mt-8">
          <div className="flex flex-col justify-center gap-8">
            {Array.from(Array(3), (_, i) => (
              <div
                key={i}
                className="bg-gray-200 w-full max-w-sm h-52 rounded-lg animate-pulse dark:bg-neutral-400 mx-auto"
              />
            ))}
          </div>
        </div>
      )}
      {userData && (
        <section className="flex flex-col flex-wrap gap-12 justify-center items-center mt-8">
          <div className="max-w-xs">
            <h2 className="font-medium dark:text-neutral-100">Update Email</h2>
            <p className="mt-1 mb-4 dark:text-neutral-400">
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
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                type="email"
                name="email"
                placeholder="new@email.com"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />
              <span className="block mt-3">
                <Button
                  disabled={loading["emailUpdate"]}
                  aria-disabled={loading["emailUpdate"]}
                  type="submit"
                  bgColor="bg-button dark:bg-neutral-700"
                  textColor="text-button-text dark:text-neutral-300"
                >
                  {loading["emailUpdate"]
                    ? "Updating email..."
                    : "Update Email"}
                </Button>
              </span>
            </form>
          </div>

          <div className="max-w-xs dark:text-neutral-100">
            <h2 className="font-medium dark:text-neutral-400">
              Reset Password
            </h2>
            <p className="mt-1 mb-4">
              You will receive a link to reset your password in your email.
            </p>
            <Button
              disabled={loading["passwordReset"] || resetSuccess}
              aria-disabled={loading["passwordReset"] || resetSuccess}
              bgColor="bg-button dark:bg-neutral-700"
              textColor="text-button-text dark:text-neutral-300"
              onClick={onResetPassword}
            >
              {loading["passwordReset"] ? "Sending email..." : "Reset Password"}
            </Button>
            {resetSuccess && (
              <small className="block text-green-600 font-medium mt-1 animate-fade">
                We sent you an email with instructions to reset your password.
              </small>
            )}
          </div>

          <div className="max-w-xs">
            <h2 className="font-medium dark:text-neutral-100">
              Delete Profile
            </h2>
            <p className="mt-1 mb-4 dark:text-neutral-400">
              Delete your profile and all the data connected to it. This is not
              reversible.
            </p>
            <Button
              bgColor="bg-button dark:bg-neutral-700"
              textColor="text-button-text dark:text-neutral-300"
              onClick={() => setShowDeleteConfirmation(!showDeleteConfirmation)}
            >
              Delete Profile
            </Button>
            {showDeleteConfirmation && (
              <div className="mt-5">
                <small className="block text-gray-500 font-medium mt-1 dark:text-neutral-400">
                  Are you sure you want to delete your profile?
                </small>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Button
                    bgColor="bg-button dark:bg-neutral-700"
                    textColor="text-button-text dark:text-neutral-300"
                    onClick={() => setShowDeleteConfirmation(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      router.push(
                        `${process.env.NEXT_PUBLIC_SITE_URL}/auth/deleteUser?user=${userData?.id}`
                      );
                    }}
                    bgColor="bg-red-500"
                    textColor="text-white"
                  >
                    Yes, delete my profile
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
