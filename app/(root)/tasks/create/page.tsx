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

const NewTaskForm = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showTimeScheduleModal, setShowTimeScheduleModal] = useState(false);

  const handleManagerModal = (event: any) => {
    setShowModal(!showModal);
  };
  return (
    <div className="border rounded-lg p-4">
      <div className="text-3xl font-bold mb-4">Tasks / New</div>
      <div className="mb-4">
        <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md">
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
              Task Title
            </label>
            <input
              type="text"
              className="border rounded-md px-4 py-2 mb-4"
              placeholder="Task Title"
            />
          </div>
          <div className="w-1/2">
            <div className="flex flex-wrap -mx-2">
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

        <div className="flex justify-between mb-4">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-4 border-r">
            <div className="mb-4">
              <label htmlFor="project" className="block text-sm font-semibold">
                Project
              </label>
              <select
                id="project"
                className="border rounded-md px-4 py-2 w-full"
              >
                <option value="project1">Project 1</option>
                <option value="project2">Project 2</option>
                <option value="project3">Project 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="assignedTo"
                className="block text-sm font-semibold"
              >
                Assigned To
              </label>
              <select
                id="assignedTo"
                className="border rounded-md px-4 py-2 w-full"
              >
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
                <option value="user3">User 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="parentId" className="block text-sm font-semibold">
                Parent ID
              </label>
              <select
                id="parentId"
                className="border rounded-md px-4 py-2 w-full"
              >
                <option value="parent1">Parent 1</option>
                <option value="parent2">Parent 2</option>
                <option value="parent3">Parent 3</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="plannedHours"
                className="block text-sm font-semibold"
              >
                Initially Planned Hours
              </label>
              <input
                type="number"
                id="plannedHours"
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-4">
            <div className="mb-4">
              <label htmlFor="deadline" className="block text-sm font-semibold">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-semibold">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="workingTimeRecorded"
                className="block text-sm font-semibold"
              >
                Working Time Recorded
              </label>
              <input
                type="text"
                id="workingTimeRecorded"
                className="border rounded-md px-4 py-2 w-full"
                value="0%"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="hoursSpent"
                className="block text-sm font-semibold"
              >
                Hours Spent
              </label>
              <input
                type="text"
                id="hourSpent"
                className="border rounded-md px-4 py-2 w-full"
                value="0:00"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="remainingHours"
                className="block text-sm font-semibold"
              >
                Remaining Hours
              </label>
              <input
                type="text"
                id="remainingHours"
                className="border rounded-md px-4 py-2 w-full"
                value="24:00"
                readOnly
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="Description" className="w-full h-fit">
          <TabsList className="flex items-center justify-start w-full">
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="Description"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="ts"
            >
              TimeSheet
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="ei"
            >
              Extra Info
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="st"
            >
              SubTask
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="mp"
            >
              Material Plannings
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="cm"
            >
              Consumed Material
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="mr"
            >
              Material Requisition
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="sm"
            >
              Stock Moves
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Description">
            <CreateTaskDescription />
          </TabsContent>
          <TabsContent value="ts">
            <CreateTaskTimeSheet />
          </TabsContent>
          <TabsContent value="ei">Extra Info</TabsContent>
          <TabsContent value="st">SubTask</TabsContent>
          <TabsContent value="mp">Material Planning</TabsContent>
          <TabsContent value="cm">Consumed Material</TabsContent>
          <TabsContent value="mr">Material Requisition</TabsContent>
          <TabsContent value="sm">Stock Moves</TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default NewTaskForm;
