"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Button from "@/components/actions/button/Button";
import useGetUser from "@/hooks/useGetUser";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import FormSelect from "@/components/forms/formSelect/FormSelect";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import useGetUsername from "@/hooks/useGetUsername";

export default function Settings() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const { currency } = useGetPreferredCurrency();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [preferredCurrency, setPreferredCurrency] = useState("$");
  const { user } = useGetUser();
  const router = useRouter();
  const { name, setName } = useGetUsername();
  const [username, setUsername] = useState(name);

  const onUpdateEmail = async () => {
    if (newEmail === user?.email) {
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

  const onResetPassword = async () => {
    if (!user?.email) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user?.email, {
        redirectTo: `${location.origin}/updatePassword`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setResetSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const onUpdatePreferredCurrency = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("user")
      .update({ preferred_currency: preferredCurrency })
      .eq("id", user.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Updated preferred currency.");
  };

  const onUpdateName = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("user")
      .update({ name: username })
      .eq("id", user.id)
      .select("name");

    if (error) {
      toast.error(error.message);
      return;
    }

    setName(data[0].name);
    toast.success("Updated name.");
  };

  return (
    <>
      {user && currency && (
        <>
          <h1 className="text-3xl font-semibold text-header-1">Settings</h1>
          <section className="flex flex-col flex-wrap gap-12 justify-center items-center mt-8">
            <div className="flex flex-col items-center gap-2">
              <Avatar name={user?.email ?? null} size="large" />
              {name && (
                <h2 className="font-medium text-lg text-gray-dark">{name}</h2>
              )}
              {user && (
                <h2 className="font-medium text-md text-gray-500">
                  {user.email}
                </h2>
              )}
            </div>

            <div className="max-w-xs">
              <h2 className="font-medium">Public Name</h2>
              <p className="mt-1 mb-4">
                Your name will be displayed when you share a pack.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdateName();
                }}
              >
                <label htmlFor="name" className="text-gray-light">
                  Name
                </label>
                <input
                  autoFocus
                  required
                  id="name"
                  type="text"
                  name="name"
                  className="px-4 py-2.5 bg-input rounded-xl mt-1 mb-4 w-full text-gray-600 focus:outline-gray-400 focus:bg-input-focus"
                  placeholder={name ?? ""}
                  value={username ?? ""}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <Button disabled={loading} aria-disabled={loading}>
                  Update Name
                </Button>
              </form>
            </div>

            <div className="max-w-xs">
              <h2 className="font-medium">Preferred Currency</h2>
              <p className="mt-1 mb-4">
                This will set the currency for items in your inventory.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdatePreferredCurrency();
                }}
              >
                <span className="block mb-4">
                  <FormSelect
                    label="Currency"
                    initialValue={currency}
                    options={[
                      "$",
                      "€",
                      "¥",
                      "£",
                      "CHF",
                      "₽",
                      "₩",
                      "₹",
                      "R",
                      "฿",
                      "₺",
                    ]}
                    onChange={setPreferredCurrency}
                  />
                </span>
                <Button>Save Currency</Button>
              </form>
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
                <Button disabled={loading} aria-disabled={loading}>
                  Update Email
                </Button>
              </form>
            </div>

            <div className="max-w-xs">
              <h2 className="font-medium">Reset Password</h2>
              <p className="mt-1 mb-4">
                You will receive a link to reset your password in your email.
              </p>
              <Button
                disabled={loading || resetSuccess}
                aria-disabled={loading || resetSuccess}
                onClick={onResetPassword}
              >
                Reset Password
              </Button>
              {resetSuccess && (
                <small className="block text-green-600 font-medium mt-1 animate-fade">
                  We sent you an email with instructions to reset your password.
                </small>
              )}
            </div>

            <div className="max-w-xs">
              <h2 className="font-medium">Delete Profile</h2>
              <p className="mt-1 mb-4">
                Delete your profile and all the data connected to it. This is
                not reversible.
              </p>
              <Button
                onClick={() =>
                  setShowDeleteConfirmation(!showDeleteConfirmation)
                }
              >
                Delete Profile
              </Button>
              {showDeleteConfirmation && (
                <div className="mt-5">
                  <small className="block text-gray-500 font-medium mt-1">
                    Are you sure you want to delete your profile?
                  </small>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Button onClick={() => setShowDeleteConfirmation(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        router.push(
                          `${location.origin}/auth/deleteUser?user=${user?.id}`
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
