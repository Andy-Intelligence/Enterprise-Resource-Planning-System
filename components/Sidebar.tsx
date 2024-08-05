// "use client";

// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// interface SidebarProps {
//   user?: any; // Adjust the type of user as needed
// }

// const Sidebar = ({ user }: SidebarProps) => {
//   const pathname = usePathname();

//   const procurementLinks = [
//     {
//       imgURL: "/icons/purchaseorder.svg",
//       route: "/purchase-order",
//       label: "Purchase Order",
//     },
//     { imgURL: "/icons/sales.svg", route: "/sales", label: "Sales" },
//     { imgURL: "/icons/material.svg", route: "/inventory", label: "Inventory" },
//     { imgURL: "/icons/supplier.svg", route: "/suppliers", label: "Suppliers" },
//     { imgURL: "/icons/invoice.svg", route: "/invoices", label: "Invoices" },
//     { imgURL: "/icons/boq.svg", route: "/quotes", label: "Quotes" },
//     {
//       imgURL: "/icons/materialrequisition.svg",
//       route: "/material-requisition",
//       label: "Requisition",
//     },
//     {
//       imgURL: "/icons/requestquotation.svg",
//       route: "/request-quotation",
//       label: "Quotation",
//     },
//   ];

//   const operationsLinks = [
//     { imgURL: "/icons/task.svg", route: "/tasks", label: "Tasks" },
//     { imgURL: "/icons/issue.svg", route: "/issues", label: "Issues" },
//     { imgURL: "/icons/boq.svg", route: "/boq", label: "BOQ" },
//     { imgURL: "/icons/budget.svg", route: "/budget", label: "Budget" },
//     { imgURL: "/icons/site.svg", route: "/sites", label: "Site" },
//   ];

//   const humanResourceLinks = [
//     {
//       imgURL: "/icons/contractor.svg",
//       route: "/subcontractors",
//       label: "Subcontractors",
//     },
//   ];
//   const settingLinks = [
//     {
//       imgURL: "/icons/profile.svg",
//       route: "/profile",
//       label: "Profile",
//     },
//     {
//       imgURL: "/icons/employee.svg",
//       route: "/employee",
//       label: "Employee",
//     },
//   ];

//   const independentLinks = [
//     {
//       imgURL: "/icons/report.svg",
//       route: "/report/create",
//       label: "Reports",
//     },
//     {
//       imgURL: "/icons/project.png",
//       route: "/projects",
//       label: "Projects",
//     },
//   ];

//   return (
//     <section className="sidebar min-w-fit">
//       <nav className="flex flex-col gap-4">
//         <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
//           <Image
//             src="/icons/erp.jpeg"
//             width={60}
//             height={60}
//             alt="Horizon logo"
//             className="size-[48px] max-xl:size-14"
//           />
//           <h1 className="sidebar-logo">ERP</h1>
//         </Link>

//         <Accordion type="single" collapsible>
//           <AccordionItem value="procurement">
//             <AccordionTrigger className="text-bankGradient">
//               Procurement
//             </AccordionTrigger>
//             <AccordionContent>
//               {procurementLinks.map((item) => {
//                 const isActive =
//                   pathname === item.route ||
//                   pathname.startsWith(`${item.route}/`);
//                 return (
//                   <Link
//                     href={item.route}
//                     key={item.label}
//                     className={cn("sidebar-link pl-8", {
//                       "bg-bank-gradient": isActive,
//                     })}
//                   >
//                     <div className="relative size-6">
//                       <Image
//                         src={item.imgURL}
//                         alt={item.label}
//                         fill
//                         className={cn({ "brightness-[3] invert-0": isActive })}
//                       />
//                     </div>
//                     <p
//                       className={cn("sidebar-label", {
//                         "!text-white": isActive,
//                       })}
//                     >
//                       {item.label}
//                     </p>
//                   </Link>
//                 );
//               })}
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="operations">
//             <AccordionTrigger className="text-bankGradient">
//               Operations
//             </AccordionTrigger>
//             <AccordionContent>
//               {operationsLinks.map((item) => {
//                 const isActive =
//                   pathname === item.route ||
//                   pathname.startsWith(`${item.route}/`);
//                 return (
//                   <Link
//                     href={item.route}
//                     key={item.label}
//                     className={cn("sidebar-link pl-8", {
//                       "bg-bank-gradient": isActive,
//                     })}
//                   >
//                     <div className="relative size-6">
//                       <Image
//                         src={item.imgURL}
//                         alt={item.label}
//                         fill
//                         className={cn({ "brightness-[3] invert-0": isActive })}
//                       />
//                     </div>
//                     <p
//                       className={cn("sidebar-label", {
//                         "!text-white": isActive,
//                       })}
//                     >
//                       {item.label}
//                     </p>
//                   </Link>
//                 );
//               })}
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="humanResource">
//             <AccordionTrigger className="text-bankGradient">
//               Human Resource
//             </AccordionTrigger>
//             <AccordionContent>
//               {humanResourceLinks.map((item) => {
//                 const isActive =
//                   pathname === item.route ||
//                   pathname.startsWith(`${item.route}/`);
//                 return (
//                   <Link
//                     href={item.route}
//                     key={item.label}
//                     className={cn("sidebar-link pl-8", {
//                       "bg-bank-gradient": isActive,
//                     })}
//                   >
//                     <div className="relative size-6">
//                       <Image
//                         src={item.imgURL}
//                         alt={item.label}
//                         fill
//                         className={cn({ "brightness-[3] invert-0": isActive })}
//                       />
//                     </div>
//                     <p
//                       className={cn("sidebar-label", {
//                         "!text-white": isActive,
//                       })}
//                     >
//                       {item.label}
//                     </p>
//                   </Link>
//                 );
//               })}
//             </AccordionContent>
//           </AccordionItem>
//           <AccordionItem value="settingLink">
//             <AccordionTrigger className="text-bankGradient">
//               Setting {" "}
//             </AccordionTrigger>
//             <AccordionContent>
//               {settingLinks.map((item) => {
//                 const isActive =
//                   pathname === item.route ||
//                   pathname.startsWith(`${item.route}/`);
//                 return (
//                   <Link
//                     href={item.route}
//                     key={item.label}
//                     className={cn("sidebar-link pl-8", {
//                       "bg-bank-gradient": isActive,
//                     })}
//                   >
//                     <div className="relative size-6">
//                       <Image
//                         src={item.imgURL}
//                         alt={item.label}
//                         fill
//                         className={cn({ "brightness-[3] invert-0": isActive })}
//                       />
//                     </div>
//                     <p
//                       className={cn("sidebar-label", {
//                         "!text-white": isActive,
//                       })}
//                     >
//                       {item.label}
//                     </p>
//                   </Link>
//                 );
//               })}
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>

//         {independentLinks.map((item) => {
//           const isActive =
//             pathname === item.route || pathname.startsWith(`${item.route}/`);
//           return (
//             <Link
//               href={item.route}
//               key={item.label}
//               className={cn("sidebar-link", {
//                 "bg-bank-gradient": isActive,
//               })}
//             >
//               <div className="relative size-6">
//                 <Image
//                   src={item.imgURL}
//                   alt={item.label}
//                   fill
//                   className={cn({ "brightness-[3] invert-0": isActive })}
//                 />
//               </div>
//               <p
//                 className={cn("sidebar-label", {
//                   "!text-white": isActive,
//                 })}
//               >
//                 {item.label}
//               </p>
//             </Link>
//           );
//         })}
//       </nav>
//     </section>
//   );
// };

// export default Sidebar;


"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SidebarProps {
  user?: any; // Adjust the type of user as needed
}

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  const sections = [
    {
      title: "Procurement",
      links: [
        {
          imgURL: "/icons/purchaseorder.svg",
          route: "/purchase-order",
          label: "Purchase Order",
        },
        { imgURL: "/icons/sales.svg", route: "/sales", label: "Sales" },
        {
          imgURL: "/icons/material.svg",
          route: "/inventory",
          label: "Inventory",
        },
        {
          imgURL: "/icons/supplier.svg",
          route: "/suppliers",
          label: "Suppliers",
        },
        { imgURL: "/icons/invoice.svg", route: "/invoices", label: "Invoices" },
        { imgURL: "/icons/boq.svg", route: "/quotes", label: "Quotes" },
        {
          imgURL: "/icons/materialrequisition.svg",
          route: "/material-requisition",
          label: "Requisition",
        },
        {
          imgURL: "/icons/requestquotation.svg",
          route: "/request-quotation",
          label: "Quotation",
        },
      ],
    },
    {
      title: "Operations",
      links: [
        { imgURL: "/icons/task.svg", route: "/tasks", label: "Tasks" },
        { imgURL: "/icons/issue.svg", route: "/issues", label: "Issues" },
        { imgURL: "/icons/boq.svg", route: "/boq", label: "BOQ" },
        { imgURL: "/icons/budget.svg", route: "/budget", label: "Budget" },
        { imgURL: "/icons/site.svg", route: "/sites", label: "Site" },
      ],
    },
    {
      title: "Human Resource",
      links: [
        {
          imgURL: "/icons/contractor.svg",
          route: "/subcontractors",
          label: "Subcontractors",
        },
        {
          imgURL: "/icons/payroll.svg",
          route: "/payroll",
          label: "Payroll",
        },
        {
          imgURL: "/icons/appraisal.svg",
          route: "/appraisal",
          label: "Appraisal",
        },
      ],
    },
    {
      title: "Settings",
      links: [
        { imgURL: "/icons/profile.svg", route: "/profile", label: "Profile" },
        {
          imgURL: "/icons/employee.svg",
          route: "/employee",
          label: "Employee",
        },
      ],
    },
  ];

  const independentLinks = [
    { imgURL: "/icons/report.svg", route: "/report/create", label: "Reports" },
    { imgURL: "/icons/project.png", route: "/projects", label: "Projects" },
  ];

  return (
    <aside className="shadow-lg w-64 h-fit min-h-screen bg-white ">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Image
            src="/icons/erp.jpeg"
            width={48}
            height={48}
            alt="ERP logo"
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-800">ERP</h1>
        </Link>

        <nav className="space-y-2">
          <Accordion type="single" collapsible className="space-y-2">
            {sections.map((section) => (
              <AccordionItem
                key={section.title}
                value={section.title.toLowerCase()}
                
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-700 hover:text-blue-600 hover:no-underline transition-colors">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="ml-4 space-y-1">
                    {section.links.map((item) => {
                      const isActive =
                        pathname === item.route ||
                        pathname.startsWith(`${item.route}/`);
                      return (
                        <Link
                          href={item.route}
                          key={item.label}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isActive
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          )}
                        >
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn({ "filter invert": isActive })}
                          />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="pt-4 border-t border-gray-200">
            {independentLinks.map((item) => {
              const isActive =
                pathname === item.route ||
                pathname.startsWith(`${item.route}/`);
              return (
                <Link
                  href={item.route}
                  key={item.label}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={cn({ "filter invert": isActive })}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
