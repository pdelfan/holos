import Avatar from "@/components/dataDisplay/avatar/Avatar";
import SettingsTabs from "@/components/navigational/tabs/SettingsTabs";
import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import router from "next/navigation";

export const metadata: Metadata = {
  title: "Holos — Settings",
  description: "Settings",
};

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getUserData = async () => {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.redirect("/");
    }

    const { data: user } = await supabase
      .from("user")
      .select("name, avatar_url, email, id, preferred_currency")
      .eq("id", data.session.user.id);

    if (user) {
      return user[0];
    }
  };

  const userData = await getUserData();

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold text-header-1 dark:text-neutral-100">
        Settings
      </h1>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          name={userData?.email}
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
      <SettingsTabs />
      {children}
    </>
  );
}
