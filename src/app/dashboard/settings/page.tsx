"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/actions/button/Button";
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
  | "currencyUpdate"
  | "nameUpdate"
  | "avatarUpdate"
  | "avatarRemove"
  | "uploadAvatar";

interface LoadingState {
  [key: string]: boolean;
}

export default function Settings() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<LoadingState>({});
  const { currency, setCurrency } = useGetPreferredCurrency({
    showAbbreviation: true,
  });
  const [preferredCurrency, setPreferredCurrency] = useState("");
  const router = useRouter();
  const { userData, setUserData } = useGetUserData();
  const [username, setUsername] = useState(userData?.name);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState<string | null>(null);

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

  const onUpdatePreferredCurrency = async () => {
    if (!userData) return;
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

      setCurrency(preferredCurrency);
      toast.success("Updated preferred currency.");
    } finally {
      stopLoading("currencyUpdate");
    }
  };

  const onUpdateName = async () => {
    if (!userData) return;
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

      router.refresh();
      toast.success("Updated name.");
    } finally {
      stopLoading("nameUpdate");
    }
  };

  const onUpdateAvatar = async () => {
    if (!imageURL) {
      toast.error("Please upload an image.");
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
        .update({ avatar_url: imageURL })
        .eq("id", session.user.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      setInputKey(Date.now().toString());
      router.refresh();
      setUserData((prev) => ({ ...prev!, avatar_url: imageURL }));
      toast.success("Updated avatar.");
    } finally {
      stopLoading("avatarUpdate");
    }
  };

  const onRemoveAvatar = async () => {
    if (!userData?.avatar_url) {
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session || !userData) {
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

      router.refresh();
      setUserData((prev) => ({ ...prev!, avatar_url: null }));
      toast.success("Removed avatar.");
    } finally {
      stopLoading("avatarRemove");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // size is more than 2MB
    if (e.target.files[0].size > 2097152) {
      toast.error(
        "Image uploaded is too large. Please upload an image less than 2MB."
      );
      setImage(null);
      setInputKey(Date.now().toString());
      return;
    }

    const image = e.target.files[0];
    setImage(image);

    const formData = new FormData();
    formData.append("image", image);

    startLoading("uploadAvatar");
    const response = await fetch("/api/imgur", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!data.success) {
      toast.error("Couldn't upload image.");
      return;
    }
    setImageURL(data.data.link);
    stopLoading("uploadAvatar");
  };

  return (
    <>
      {!userData && !currency && (
        <div className="flex flex-col gap-2 mt-8">
          <div className="flex flex-col justify-center gap-12">
            {Array.from(Array(3), (_, i) => (
              <div
                key={i}
                className="bg-gray-200 w-full max-w-sm h-52 rounded-lg animate-pulse dark:bg-neutral-400 mx-auto"
              />
            ))}
          </div>
        </div>
      )}
      {userData && currency && preferredCurrency && (
        <>
          <section className="flex flex-col flex-wrap gap-12 justify-center items-center mt-8">
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
                <Label htmlFor="avatar">
                  {loading["uploadAvatar"]
                    ? "(Uploading image...)"
                    : "Upload Image"}
                </Label>
                <Input
                  type="file"
                  key={inputKey || ""}
                  accept=".png, .jpg, .jpeg, .gif"
                  aria-label="Image"
                  onChange={handleImageChange}
                  disabled={loading["uploadAvatar"]}
                />
                <span className="flex flex-wrap gap-3 mt-3">
                  <Button
                    bgColor="bg-button dark:bg-neutral-700"
                    textColor="text-button-text dark:text-neutral-300"
                    type="submit"
                    disabled={
                      loading["avatarUpdate"] || loading["uploadAvatar"]
                    }
                    aria-disabled={
                      loading["avatarUpdate"] || loading["uploadAvatar"]
                    }
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
                    disabled={loading["avatarRemove"]}
                    aria-disabled={loading["avatarRemove"]}
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
          </section>
        </>
      )}
    </>
  );
}
