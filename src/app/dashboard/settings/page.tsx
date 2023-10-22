"use client";

import React, { useEffect, useState } from "react";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Button from "@/components/actions/button/Button";
import useGetUser from "@/hooks/useGetUser";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormSelect from "@/components/forms/formSelect/FormSelect";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import useGetUserData from "@/hooks/useGetUserData";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";
import { CURRENCIES } from "@/utils/currencyUtils";

type Action =
  | "emailUpdate"
  | "passwordReset"
  | "currencyUpdate"
  | "nameUpdate"
  | "avatarUpdate"
  | "avatarRemove";

interface LoadingState {
  [key: string]: boolean;
}

export default function Settings() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<LoadingState>({});
  const [newEmail, setNewEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const { currency } = useGetPreferredCurrency({ showAbbreviation: true });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [preferredCurrency, setPreferredCurrency] = useState("");
  const { user } = useGetUser();
  const router = useRouter();
  const { userData, setUserData } = useGetUserData();
  const [username, setUsername] = useState(userData?.name);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!currency) return;
    setPreferredCurrency(currency);
  }, [currency]);

  const startLoading = (action: Action) => {
    setLoading((prev) => ({ ...prev, [action]: true }));
  };

  const stopLoading = (action: Action) => {
    setLoading((prev) => ({ ...prev, [action]: false }));
  };

  const onUpdateEmail = async () => {
    if (newEmail === user?.email) {
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
    if (!user?.email) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/");
      return;
    }

    startLoading("passwordReset");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user?.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/updatePassword`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setResetSuccess(true);
    } finally {
      stopLoading("passwordReset");
    }
  };

  const onUpdatePreferredCurrency = async () => {
    if (!user) return;
    if (preferredCurrency === currency) {
      toast.error(
        "New preferred currency cannot be the same as your current preferred currency."
      );
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/");
      return;
    }

    startLoading("currencyUpdate");

    try {
      const { error } = await supabase
        .from("user")
        .update({ preferred_currency: preferredCurrency })
        .eq("id", session.user.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Updated preferred currency.");
    } finally {
      stopLoading("currencyUpdate");
    }
  };

  const onUpdateName = async () => {
    if (!user) return;
    if (username === userData?.name) {
      toast.error("New name cannot be the same as your current name.");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/");
      return;
    }

    startLoading("nameUpdate");

    try {
      const { data, error } = await supabase
        .from("user")
        .update({ name: username })
        .eq("id", session.user.id)
        .select("name");

      if (error) {
        toast.error(error.message);
        return;
      }

      setUserData((prev) => ({
        ...prev!,
        name: data?.[0].name,
        avatar_url: prev?.avatar_url ?? null,
      }));

      toast.success("Updated name.");
    } finally {
      stopLoading("nameUpdate");
    }
  };

  const onUpdateAvatar = async () => {
    if (!user || !avatar) return;
    if (avatar === userData?.avatar_url) {
      toast.error("New avatar cannot be the same as your current avatar.");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/");
      return;
    }

    startLoading("avatarUpdate");

    try {
      const { error } = await supabase
        .from("user")
        .update({ avatar_url: avatar })
        .eq("id", session.user.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      setUserData((prev) => ({
        ...prev!,
        avatar_url: avatar,
      }));

      toast.success("Updated avatar.");
    } finally {
      stopLoading("avatarUpdate");
    }
  };

  const onRemoveAvatar = async () => {
    if (!user) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/");
      return;
    }

    startLoading("avatarRemove");

    try {
      const { error } = await supabase
        .from("user")
        .update({ avatar_url: null })
        .eq("id", session.user.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      setUserData((prev) => ({
        ...prev!,
        avatar_url: null,
      }));

      toast.success("Removed avatar.");
    } finally {
      stopLoading("avatarRemove");
    }
  };

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold text-header-1 dark:text-neutral-100">
        Settings
      </h1>
      {!userData && !currency && (
        <>
          <div className="flex flex-col gap-2 mt-8">
            <div className="flex flex-col justify-center gap-2">
              <div className="bg-gray-200 grow h-24 w-24 rounded-full animate-pulse dark:bg-neutral-400 mb-3 mx-auto" />
              <div className="flex flex-col gap-4">
                {Array.from(Array(6), (_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 w-full max-w-sm h-52 rounded-lg animate-pulse dark:bg-neutral-400 mx-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {userData && currency && preferredCurrency && (
        <>
          <section className="flex flex-col flex-wrap gap-12 justify-center items-center mt-8">
            <div className="flex flex-col items-center gap-2">
              <Avatar
                name={userData?.email ?? null}
                image={userData?.avatar_url}
                size="large"
              />
              {userData?.name && (
                <h2 className="font-medium text-lg text-gray-dark dark:text-neutral-100">
                  {userData.name}
                </h2>
              )}
              {userData && (
                <h2 className="font-medium text-md text-gray-500 dark:text-gray-400">
                  {userData.email}
                </h2>
              )}
            </div>

            <div className="max-w-xs">
              <h2 className="font-medium dark:text-neutral-100">Public Name</h2>
              <p className="mt-1 mb-4 dark:text-neutral-400">
                Your name will be displayed when you share a pack.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdateName();
                }}
              >
                <Label htmlFor="name">Name</Label>
                <Input
                  required
                  id="name"
                  name="name"
                  type="text"
                  placeholder={userData?.name ?? ""}
                  value={username ?? ""}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <span className="block mt-3">
                  <Button
                    bgColor="bg-button dark:bg-neutral-700"
                    textColor="text-button-text dark:text-neutral-300"
                    type="submit"
                    disabled={loading["nameUpdate"]}
                    aria-disabled={loading["nameUpdate"]}
                  >
                    {loading["nameUpdate"] ? "Updating name..." : "Update Name"}
                  </Button>
                </span>
              </form>
            </div>

            <div className="max-w-xs">
              <h2 className="font-medium dark:text-neutral-100">Avatar</h2>
              <p className="mt-1 mb-4 dark:text-neutral-400">
                Enter the address of the image you have chosen for you avatar.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdateAvatar();
                }}
              >
                <Label htmlFor="avatar">Image URL</Label>
                <Input
                  required
                  id="avatar"
                  name="avatar"
                  type="url"
                  placeholder={avatar ?? "https://"}
                  value={avatar ?? ""}
                  onChange={(e) => {
                    setAvatar(e.target.value);
                  }}
                />
                <span className="flex flex-wrap gap-3 mt-3">
                  <Button
                    bgColor="bg-button dark:bg-neutral-700"
                    textColor="text-button-text dark:text-neutral-300"
                    type="submit"
                    disabled={loading["avatarUpdate"]}
                    aria-disabled={loading["avatarUpdate"]}
                  >
                    {loading["avatarUpdate"]
                      ? "Updating avatar..."
                      : "Update Avatar"}
                  </Button>
                  <Button
                    bgColor="bg-button dark:bg-neutral-700"
                    textColor="text-button-text dark:text-neutral-300"
                    type="button"
                    onClick={onRemoveAvatar}
                    disabled={loading["avatarRemove"] || !userData?.avatar_url}
                    aria-disabled={
                      loading["avatarRemove"] || !userData?.avatar_url
                    }
                  >
                    {loading["avatarRemove"]
                      ? "Removing avatar..."
                      : "Remove Avatar"}
                  </Button>
                </span>
              </form>
            </div>

            <div className="max-w-xs">
              <h2 className="font-medium dark:text-neutral-100">
                Preferred Currency
              </h2>
              <p className="mt-1 mb-4 dark:text-neutral-400">
                This will set the currency for items in your inventory.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdatePreferredCurrency();
                }}
              >
                <span className="block mb-3">
                  <FormSelect
                    label="Currency"
                    initialValue={preferredCurrency}
                    options={Object.keys(CURRENCIES)}
                    onChange={setPreferredCurrency}
                  />
                </span>
                <Button
                  type="submit"
                  bgColor="bg-button dark:bg-neutral-700"
                  textColor="text-button-text dark:text-neutral-300"
                  disabled={loading["currencyUpdate"]}
                  aria-disabled={loading["currencyUpdate"]}
                >
                  {loading["currencyUpdate"]
                    ? "Updating currency..."
                    : "Update Currency"}
                </Button>
              </form>
            </div>

            <div className="max-w-xs">
              <h2 className="font-medium dark:text-neutral-100">
                Update Email
              </h2>
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
                {loading["passwordReset"]
                  ? "Sending email..."
                  : "Reset Password"}
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
                Delete your profile and all the data connected to it. This is
                not reversible.
              </p>
              <Button
                bgColor="bg-button dark:bg-neutral-700"
                textColor="text-button-text dark:text-neutral-300"
                onClick={() =>
                  setShowDeleteConfirmation(!showDeleteConfirmation)
                }
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
                          `${process.env.NEXT_PUBLIC_SITE_URL}/auth/deleteUser?user=${user?.id}`
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
        </>
      )}
    </>
  );
}
