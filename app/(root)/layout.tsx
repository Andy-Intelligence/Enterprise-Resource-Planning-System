import MobileNav from "@/components/MobileNav";
import QuickLink from "@/components/QuickLink";
import Sidebar from "@/components/Sidebar";
import { QuickLinksData } from "@/lib/StaticData";
// import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const getLoggedInUser = async ()=>{return {}}
  // const loggedIn = await getLoggedInUser();

  // if (!loggedIn) redirect("/sign-in");

  return (
    <div className="flex flex-col">
          <QuickLink arr={QuickLinksData} /> 
      <main className="flex h-screen w-full font-inter">
        {/* <Sidebar user={loggedIn} /> */}
        <Sidebar />

        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
            <div>
              {/* <MobileNav user={loggedIn} /> */}
              <MobileNav  />
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
