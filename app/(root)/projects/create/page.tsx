"use client"
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

const NewProjectForm = () => {
  const router = useRouter()
      const [showModal, setShowModal] = useState(false);
      const [showTimeScheduleModal, setShowTimeScheduleModal] = useState(false);

      const handleManagerModal = (event:any) => {
      
          setShowModal(!showModal);
    
      };
  return (
    <div className="border rounded-lg p-4">
      <div className="text-3xl font-bold mb-4">Projects / New</div>
      <div className="mb-4">
        <Button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md">
          Save
        </Button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Discard
        </button>
      </div>
      <form>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-4">
            <label className="block text-sm font-semibold mb-2">
              Project Name
            </label>
            <input
              type="text"
              className="border rounded-md px-4 py-2 mb-4"
              placeholder="Project Name"
            />
            {/* revivew later */}
            {/* <div className="mb-4 flex items-center justify-start">
              <div className="flex items-center justify-center gap-1">
                <input type="checkbox" className="" />
                <label className="block text-sm font-semibold">Tasks</label>
                <span className="mr-4">as Tasks</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <input type="checkbox" className="mr-2" />
                <label className="block text-sm font-semibold">Issues</label>
                <span className="mr-4">as Issues</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <input type="checkbox" />
                <label className="block text-sm font-semibold">
                  Allow Timesheet
                </label>
              </div>
            </div> */}
          </div>
          <div className="w-1/2">
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2 mb-4">
                <div
                  className="flex gap-2 items-center select-none cursor-pointer"
                  onClick={() => router.push("/projects/create/attachments")}
                >
                  <div>
                    <IoDocumentsSharp className="text-bankGradient" size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
                      1
                    </div>
                    <div>Documents</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <FaTasks className="text-bankGradient" size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
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
                      className="text-bankGradient"
                      size={32}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
                      1
                    </div>
                    <div>Issues</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <FaRegCalendarAlt className="text-bankGradient" size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
                      1
                    </div>
                    <div>TimeSheets</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <IoIosRadioButtonOn
                      className="text-bankGradient"
                      size={32}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div>Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="flex items-center justify-start w-full">
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="details"
            >
              Details
            </TabsTrigger>
            {/* <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="rso"
            >
              Related Sales Order
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="rpo"
            >
              Related Purchase Order
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="inventoryusage"
            >
              Inventory Usage
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="projectdeliverables"
            >
              Project Deliverables
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="workpackage"
            >
              Work Package
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="details">
            <CreateProjectSettings />
          </TabsContent>
          {/* <TabsContent value="rso">
            <CreateProjectRelatedSalesOrder />
          </TabsContent>
          <TabsContent value="rpo">
            <CreateProjectRelatedPurchaseOrder />
          </TabsContent>
          <TabsContent value="inventoryusage">
            <CreateProjectInventoryUsage />
          </TabsContent>
          <TabsContent value="projectdeliverables">
            <CreateProjectDeliverables />
          </TabsContent>
          <TabsContent value="workpackage">
            <CreateProjectWorkPackage />
          </TabsContent> */}
        </Tabs>
      </form>
    </div>
  );
};

export default NewProjectForm;









