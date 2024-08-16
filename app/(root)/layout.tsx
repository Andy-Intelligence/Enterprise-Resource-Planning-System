// import MobileNav from "@/components/MobileNav";
// import QuickLink from "@/components/QuickLink";
// import Sidebar from "@/components/Sidebar";
// import { QuickLinksData } from "@/lib/StaticData";
// // import { getLoggedInUser } from "@/lib/actions/user.actions";
// import Image from "next/image";
// import { redirect } from "next/navigation";

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   // const getLoggedInUser = async ()=>{return {}}
//   // const loggedIn = await getLoggedInUser();

//   // if (!loggedIn) redirect("/sign-in");

//   return (
//     <div className="flex flex-col">
//           <QuickLink arr={QuickLinksData} /> 
//       <main className="flex h-screen w-full font-inter">
//         {/* <Sidebar user={loggedIn} /> */}
//         <Sidebar />

//         <div className="flex size-full flex-col">
//           <div className="root-layout">
//             <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
//             <div>
//               {/* <MobileNav user={loggedIn} /> */}
//               <MobileNav  />
//             </div>
//           </div>
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import MobileNav from "@/components/MobileNav";
import QuickLink from "@/components/QuickLink";
import Sidebar from "@/components/Sidebar";
import { QuickLinksData } from "@/lib/StaticData";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State to manage sidebar expansion
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Quick Links */}

      <main className="flex h-full w-full font-inter">
        {/* Sidebar */}
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />

        {/* Main Content Area */}
        <div
          className={`flex-grow flex flex-col transition-all duration-300  ${
            isSidebarExpanded ? "ml-[240px]" : "ml-[80px]"
          }`}
        >
          <QuickLink arr={QuickLinksData} />
          {/* Top Navigation with Logo and MobileNav */}
          <div className="root-layout flex justify-between items-center mb-4">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
            <MobileNav />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
