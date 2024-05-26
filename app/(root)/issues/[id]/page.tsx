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
import IssueExtraInfo from "@/components/IssueExtraInfo";
import IssueTimeSheet from "@/components/IssueTimeSheet";

const page = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showTimeScheduleModal, setShowTimeScheduleModal] = useState(false);

  const handleManagerModal = (event: any) => {
    setShowModal(!showModal);
  };
  return (
    <div className="border rounded-lg p-4 relative">
      <div className="text-3xl font-bold mb-4">
        Issue / Big Isssue in Pipeline
      </div>
      <div className="absolute top-0 right-0 mt-4 mr-8 flex items-center">
        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-4">
            <div className="flex gap-2 items-center">
              <div>
                <IoIosRadioButtonOn className="text-bankGradient" size={32} />
              </div>
              <div className="flex flex-col">
                <div>Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <div className="mb-4">
              <label
                htmlFor="issueTitle"
                className="block text-sm font-semibold"
              >
                Issue Title
              </label>
              <div>Big Issue in Pipeline</div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="assignedTo"
                className="block text-sm font-semibold"
              >
                Assigned To
              </label>
              <div>administrator</div>
            </div>
            <div className="mb-4">
              <label htmlFor="priority" className="block text-sm font-semibold">
                Priority
              </label>
              <div className="flex items-center">
                <IoIosRadioButtonOn className="text-yellow-500" />
                <IoIosRadioButtonOn className="text-yellow-500" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-semibold">
                Tags
              </label>
              <div>Tags</div>
            </div>
          </div>

          {/* Right Section */}
          <div className=" w-full md:w-1/2 p-4">
            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm font-semibold">
                Contact
              </label>
              <div>contact</div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <div>email</div>
            </div>
            <div className="mb-4">
              <label htmlFor="project" className="block text-sm font-semibold">
                Project
              </label>
              <div>Projects</div>
            </div>
            <div className="mb-4">
              <label htmlFor="task" className="block text-sm font-semibold">
                Task
              </label>
              <div>Tasks</div>
            </div>
          </div>
        </div>
      <Tabs defaultValue="description" className="w-full h-fit">
        <TabsList className="flex items-center justify-start w-full">
          <TabsTrigger
            className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
            value="description"
            >
            description
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
            value="timesheet"
            >
            TimeSheet
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
            value="extrainfo"
            >
            Extra Info
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          {/* <CreateBOQmaterials /> */}Description text will be here
        </TabsContent>
        <TabsContent value="timesheet">
          <IssueTimeSheet />
        </TabsContent>
        <TabsContent value="extrainfo">
          <IssueExtraInfo />
        </TabsContent>
      </Tabs>
              </form>
    </div>
  );
};

export default page;
