"use client";
import React, { useState } from "react";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import CreateEditCustomer from "@/components/CreateEditCustomer";
import CreateEditTimeSchedule from "@/components/CreateEditTimeSchedule";
import CreateProjectSettings from "@/components/CreateProjectSettings";
import CreateProjectRelatedSalesOrder from "@/components/CreateProjectRelatedSalesOrder";
import CreateProjectRelatedPurchaseOrder from "@/components/CreateProjectRelatedPurchaseOrder";
import CreateProjectInventoryUsage from "@/components/CreateProjectInventoryUsage";
import CreateProjectDeliverables from "@/components/CreateProjectDeliverables";
import CreateProjectWorkPackage from "@/components/CreateProjectWorkPackage";
import CreateTaskDescription from "@/components/CreateTaskDescription";
import CreateTaskTimeSheet from "@/components/CreateTaskTimeSheet";
import CreateBOQmaterials from "@/components/CreateBOQmaterials";

const BillOfQuantity = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showTimeScheduleModal, setShowTimeScheduleModal] = useState(false);

  const handleManagerModal = (event: any) => {
    setShowModal(!showModal);
  };
  return (
    <div className="border rounded-lg p-4">
      <div className="text-3xl font-bold mb-4">Bill of Quantity / New</div>
      <div className="mb-4">
        <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md">
          Save
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Discard
        </button>
      </div>
      <form>
        <div className="flex justify-between mb-4">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-4 border-r">
            <div className="flex items-center mb-4 gap-1">
              <label htmlFor="project" className="block text-sm font-semibold">
                Project
              </label>
              <select id="project" className="border rounded-md px-2 py-1">
                <option value="project1">Project 1</option>
                <option value="project2">Project 2</option>
                <option value="project3">Project 3</option>
              </select>
            </div>
            <div className="mb-4 flex items-center">
              <label
                htmlFor="subcontractCost"
                className="block text-sm font-semibold"
              >
                Subcontract Cost:
              </label>
              <div>
                <span className="ml-1">0.00</span>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <label
                htmlFor="equipmentCost"
                className="block text-sm font-semibold"
              >
                Equipment Cost:
              </label>
              <div>
                <span className="ml-1">0.00</span>
              </div>
            </div>

            <div className="flex items-center mb-4 gap-1">
              <label
                htmlFor="estimatedCost"
                className="block text-sm font-semibold"
              >
                Estimated Cost
              </label>
              <input
                type="number"
                id="estimatedCost"
                className="border rounded-md px-2 py-1 "
              />
            </div>
            <div className="mb-4 flex items-center">
              <label htmlFor="revision" className="block text-sm font-semibold">
                Revision:
              </label>
              <div>
                <span className="ml-1">0</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-4">
            <div className="mb-4 flex items-center">
              <label
                htmlFor="materialCost"
                className="block text-sm font-semibold"
              >
                Material Cost:
              </label>
              <div>
                <span className="ml-1">0.00</span>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <label
                htmlFor="labourCost"
                className="block text-sm font-semibold"
              >
                Labour Cost:
              </label>
              <div>
                <span className="ml-1">0.00</span>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <label
                htmlFor="workPackageCost"
                className="block text-sm font-semibold"
              >
                Work Package Cost:
              </label>
              <div>
                <span className="ml-1">0.00</span>
              </div>
            </div>

            <div className="flex items-center mb-4 gap-1">
              <label
                htmlFor="markupCost"
                className="block text-sm font-semibold"
              >
                Mark Up Cost (in %)
              </label>
              <input
                type="number"
                id="estimatedCost"
                className="border rounded-md px-2 py-1 "
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="materials" className="w-full h-fit">
          <TabsList className="flex items-center justify-start w-full">
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="materials"
            >
              Materials
            </TabsTrigger>
           
          </TabsList>
          <TabsContent value="materials">
            <CreateBOQmaterials/>
          </TabsContent>
        
        </Tabs>
      </form>
    </div>
  );
};

export default BillOfQuantity;
