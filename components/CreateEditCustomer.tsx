"use client";
import React, { useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";

const CreateEditCustomer = () => {
  const [showModal, setShowModal] = useState(false);
 const [customerType, setCustomerType] = useState("individual");

   const handleCustomerTypeChange = (event:any) => {
     setCustomerType(event.target.value);
   };
  const handleManagerSelect = (event: any) => {
    if (event.target.value === "createandedit") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  return (
    <div className="border rounded-lg p-4">
      <div className="text-3xl font-bold mb-4">Create : Customer</div>
      <div className="mb-4">
        <button className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md">
          Save
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Discard
        </button>
      </div>
      <form>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-4">
            <label className="block text-sm font-semibold mb-2">
              Customer Name
            </label>
            <input
              type="text"
              className="border rounded-md px-4 py-2 mb-4"
              placeholder="Customer Name"
            />
            <div className="mb-4 flex items-center justify-start gap-2">
              <div className="flex items-center justify-center gap-1">
                <input
                  type="radio"
                  value="company"
                  checked={customerType === "company"}
                  onChange={handleCustomerTypeChange}
                />
                <label className="block text-sm font-semibold">Company</label>
              </div>
              <div className="flex items-center justify-start gap-1">
                <input
                  type="radio"
                  value="individual"
                  checked={customerType === "individual"}
                  onChange={handleCustomerTypeChange}
                />
                <label className="block text-sm font-semibold">
                  Individual
                </label>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <FaFileInvoice className="text-green-500 " size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-green-500 ">
                      1
                    </div>
                    <div>Invoice</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <FaBook className="text-green-500 " size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-green-500 ">
                      1
                    </div>
                    <div>Analytic Account</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <FaTasks className="text-green-500 " size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-green-500 ">
                      1
                    </div>
                    <div>Tasks</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <AiOutlineIssuesClose
                      className="text-green-500 "
                      size={32}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-green-500  ">
                      1
                    </div>
                    <div>Issues</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <TbCurrencyNaira className="text-green-500 " size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-green-500 ">
                      1
                    </div>
                    <div>Sales</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <IoIosRadioButtonOn className="text-green-500 " size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div>Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-2 mb-4 gap-2">
            <div className="flex flex-col items-start gap-2 ">
              <label className="block text-sm font-semibold">Address</label>
              <input type="text" className="border rounded-md px-4 py-2 mt-1" />
            </div>
            <div className="flex flex-col items-start gap-2 ">
              <label className="block text-sm font-semibold">Website</label>
              <input type="text" className="border rounded-md px-4 py-2 mt-1" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="block text-sm font-semibold">Phone</label>
              <input type="text" className="border rounded-md px-4 py-2 mt-1" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="block text-sm font-semibold">Email</label>
              <input type="text" className="border rounded-md px-4 py-2 mt-1" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="ca" className="w-full">
          <TabsList className="flex items-center justify-start w-full">
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="ca"
            >
              Contacts&Address
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="in"
            >
              Internal Notes
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="sp"
            >
              Sales and Purchases
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="accounting"
            >
              Accounting
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ca">ca</TabsContent>
          <TabsContent value="in">in</TabsContent>
          <TabsContent value="sp">sp</TabsContent>
          <TabsContent value="accounting">accounting</TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default CreateEditCustomer;
