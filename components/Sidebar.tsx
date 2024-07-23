"use client";

import { useState } from "react";
import { sidebarLinks } from "@/constants";
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
  user: any; // Adjust the type of user as needed
}

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  const procurementLinks = [
    {
      imgURL: "/icons/purchaseorder.svg",
      route: "/purchase-order",
      label: "Purchase Order",
    },
    { imgURL: "/icons/sales.svg", route: "/sales", label: "Sales" },
    { imgURL: "/icons/material.svg", route: "/inventory", label: "Inventory" },
    { imgURL: "/icons/supplier.svg", route: "/suppliers", label: "Suppliers" },
    { imgURL: "/icons/invoice.svg", route: "/invoices", label: "Invoices" },
    { imgURL: "/icons/boq.svg", route: "/quotes", label: "Quotes" },
  ];

  const operationsLinks = [
    { imgURL: "/icons/task.svg", route: "/tasks", label: "Tasks" },
    { imgURL: "/icons/issue.svg", route: "/issues", label: "Issues" },
  ];

  const humanResourceLinks = [
    {
      imgURL: "/icons/contractor.svg",
      route: "/contractors",
      label: "Contractors",
    },
  ];

  return (
    <section className="sidebar min-w-fit">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/erp.jpeg"
            width={60}
            height={60}
            alt="Horizon logo"
            className="size-[48px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">ERP</h1>
        </Link>

        <Accordion type="single" collapsible>
          <AccordionItem value="procurement">
            <AccordionTrigger className="text-bankGradient">
              Procurement
            </AccordionTrigger>
            <AccordionContent>
              {procurementLinks.map((item) => {
                const isActive =
                  pathname === item.route ||
                  pathname.startsWith(`${item.route}/`);
                return (
                  <Link
                    href={item.route}
                    key={item.label}
                    className={cn("sidebar-link pl-8", {
                      "bg-bank-gradient": isActive,
                    })}
                  >
                    <div className="relative size-6">
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn({ "brightness-[3] invert-0": isActive })}
                      />
                    </div>
                    <p
                      className={cn("sidebar-label", {
                        "!text-white": isActive,
                      })}
                    >
                      {item.label}
                    </p>
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="operations">
            <AccordionTrigger className="text-bankGradient">
              Operations
            </AccordionTrigger>
            <AccordionContent>
              {operationsLinks.map((item) => {
                const isActive =
                  pathname === item.route ||
                  pathname.startsWith(`${item.route}/`);
                return (
                  <Link
                    href={item.route}
                    key={item.label}
                    className={cn("sidebar-link pl-8", {
                      "bg-bank-gradient": isActive,
                    })}
                  >
                    <div className="relative size-6">
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn({ "brightness-[3] invert-0": isActive })}
                      />
                    </div>
                    <p
                      className={cn("sidebar-label", {
                        "!text-white": isActive,
                      })}
                    >
                      {item.label}
                    </p>
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="w-full" value="humanResource">
            <AccordionTrigger className="text-bankGradient">
              Human Resource
            </AccordionTrigger>
            <AccordionContent>
              {humanResourceLinks.map((item) => {
                const isActive =
                  pathname === item.route ||
                  pathname.startsWith(`${item.route}/`);
                return (
                  <Link
                    href={item.route}
                    key={item.label}
                    className={cn("sidebar-link pl-8", {
                      "bg-bank-gradient": isActive,
                    })}
                  >
                    <div className="relative size-6">
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn({ "brightness-[3] invert-0": isActive })}
                      />
                    </div>
                    <p
                      className={cn("sidebar-label", {
                        "!text-white": isActive,
                      })}
                    >
                      {item.label}
                    </p>
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </section>
  );
};

export default Sidebar;
