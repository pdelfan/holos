import AppBar from "@/components/navigational/appBar/AppBar";
import Header from "@/components/navigational/header/Header";

export const dynamic = 'force-dynamic'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="px-3 pt-3 pb-16 sm:mt-5 sm:p-3">{children}</main>
      <AppBar />
    </>
  );
}
