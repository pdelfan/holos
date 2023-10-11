import AppBar from "@/components/navigational/appBar/AppBar";
import Header from "@/components/navigational/header/Header";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const getUserData = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    redirect("/");
  }

  const { data: user } = await supabase
    .from("user")
    .select("name, avatar_url, email, id")
    .eq("id", data.session.user.id);

  return user ? user[0] : null;
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();

  return (
    <>
      <Header user={user} />
      <main className="px-3 pt-3 pb-16 sm:mt-5 sm:p-3">{children}</main>
      <AppBar />
    </>
  );
}
