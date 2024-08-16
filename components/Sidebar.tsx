"use client"
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
import { motion } from "framer-motion";

interface SidebarProps {
  user?: any;
}

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

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
      title: "Resource(HR)",
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
    { imgURL: "/icons/project.png", route: "/clients", label: "Clients" },
  ];

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "80px" },
  };

  return (
    <motion.aside
      className="relative overflow-y-scroll min-h-screen h-fit bg-gradient-to-b from-blue-600 to-blue-700 text-white overflow-hidden transition-all duration-300 ease-in-out"
      variants={sidebarVariants}
      animate={isExpanded ? "expanded" : "collapsed"}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/erp.jpeg"
              width={40}
              height={40}
              alt="ERP logo"
              className="rounded-full border-2 border-white"
            />
            {isExpanded && (
              <h1 className="text-2xl font-bold text-white">ERP</h1>
            )}
          </Link>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:bg-blue-800 rounded-full p-2 transition-colors"
          >
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>

        <nav className="space-y-2">
          <Accordion type="single" collapsible className="space-y-2">
            {sections.map((section) => (
              <AccordionItem
                key={section.title}
                value={section.title.toLowerCase()}
                className="border-b border-blue-700"
              >
                <AccordionTrigger className="text-lg font-semibold text-blue-100 hover:text-white hover:bg-blue-700 rounded-md px-3 py-2 transition-colors">
                  {isExpanded ? (
                    section.title
                  ) : (
                    <span className="text-2xl">{section.title[0]}</span>
                  )}
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
                            "flex items-center gap-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out",
                            isActive
                              ? "bg-white text-black-1 shadow-md pl-1"
                              : "text-blue-200 hover:bg-blue-700 hover:text-white"
                          )}
                        >
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className="shrink-0"
                          />
                          {isExpanded && <span>{item.label}</span>}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="pt-4 border-t border-blue-700">
            {independentLinks.map((item) => {
              const isActive =
                pathname === item.route ||
                pathname.startsWith(`${item.route}/`);
              return (
                <Link
                  href={item.route}
                  key={item.label}
                  className={cn(
                    "flex items-center gap-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out",
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-blue-200 hover:bg-blue-700 hover:text-white"
                  )}
                >
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  {isExpanded && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
