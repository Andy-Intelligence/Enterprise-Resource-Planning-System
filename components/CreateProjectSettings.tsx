"use client";
import React, { useState } from "react";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
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
import CreateEditCustomer from "@/components/CreateEditCustomer";
import CreateEditTimeSchedule from "@/components/CreateEditTimeSchedule";




const CreateProjectSettings = () => {
      const [showModal, setShowModal] = useState(false);
      const [showTimeScheduleModal, setShowTimeScheduleModal] = useState(false);

      const handleManagerModal = (event: any) => {
        setShowModal(!showModal);
      };
  return (
    <div>
      <div className="mb-4 flex flex-col">
        <div className="flex items-center gap-2 pr-4 mb-4">
          <label className="block text-sm font-semibold w-32">
            Project Manager
          </label>

          <Select>
            <SelectTrigger className="w-[180px] bg-gray-200">
              <SelectValue placeholder="Select a Manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-gray-100">
                <SelectLabel>Manager</SelectLabel>
                <SelectItem value="manager1">Manager 1</SelectItem>
                <SelectItem value="manager2">Manager 2</SelectItem>
                <SelectItem value="manager3">Manager 3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* {showModal && ( */}
        {/* )} */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <label className="block text-sm font-semibold w-32">
              Project Sub Task
            </label>
            <Select>
              <SelectTrigger className="w-[180px] bg-gray-200">
                <SelectValue placeholder="Select a sub task" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>SubTask</SelectLabel>
                  <SelectItem value="subtask1">SubTask 1</SelectItem>
                  <SelectItem value="subtask2">SubTask 2</SelectItem>
                  <SelectItem value="subtask3">SubTask 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 mb-4 items-center">
            <label className="block text-sm font-semibold w-32">Privacy</label>
            <div>
              <label className="inline-flex items-center">
                <input type="radio" name="privacy" className="form-radio" />
                <span className="ml-2">On Invitation Only</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input type="radio" name="privacy" className="form-radio" />
                <span className="ml-2">Visible by all Employees</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input type="radio" name="privacy" className="form-radio" />
                <span className="ml-2">Visible by following Customers</span>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="block text-sm font-semibold w-32">Customer</label>
            <Select>
              <SelectTrigger className="w-[180px] bg-gray-200">
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Customer </SelectLabel>
                  <SelectItem value="customer1">Customer 1</SelectItem>
                  <SelectItem value="customer2">Customer 2</SelectItem>
                  <SelectItem value="customer3">Customer 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger className="flex items-center justify-center gap-1 px-4 py-2 mr-2 bg-blue-500 text-white rounded-md">
                <FaPlus /> <div>Add Manager</div>
              </DialogTrigger>
              <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen bg-gray-200 ">
                <CreateEditCustomer />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-8">
          {/* Configuration Section */}
          <div className="col-span-1">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 text-bankGradient">
                Configuration
              </h2>
              <div className="flex items-center gap-2">
                <label className="block text-sm font-semibold ">Sequence</label>
                <input
                  type="text"
                  className="border rounded-md px-4 py-2 mt-1"
                />
              </div>
            </div>
          </div>

          {/* Time Scheduling Section */}
          <div className="col-span-1">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 text-bankGradient">
                Time Scheduling
              </h2>
              <div className="flex items-center justify-start gap-2">
                <label className="block text-sm font-semibold">
                  Working Time
                </label>
                <Select>
                  <SelectTrigger className="w-[180px] bg-gray-200">
                    <SelectValue placeholder="Select Time Schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-gray-100">
                      <SelectLabel>Time Schedule </SelectLabel>
                      <SelectItem value="1">40hour/week</SelectItem>
                      <SelectItem value="2">60hour/week</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Dialog
                  open={showTimeScheduleModal}
                  onOpenChange={setShowTimeScheduleModal}
                >
                  <DialogTrigger className="flex items-center justify-center gap-1 px-4 py-2 mr-2 bg-blue-500 text-white rounded-md">
                    <FaPlus /> <div>Add Schedule</div>
                  </DialogTrigger>
                  <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen bg-gray-200 ">
                    <CreateEditTimeSchedule />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Custom Section */}
          <div className="col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 text-bankGradient">
                Custom
              </h2>
              <div className="flex items-center justify-start">
                <label className="block text-sm font-semibold w-32">
                  Markup Cost
                </label>
                {/* <input
                          type="text"
                          className="border rounded-md px-4 py-2 mt-1 w-32"
                        /> */}
                <span className="">0.00</span>
              </div>
              <div className="flex items-center justify-start">
                <label className="block text-sm font-semibold w-32">
                  Estimated Cost
                </label>
                {/* <input
                          type="text"
                          className="border rounded-md px-4 py-2 mt-1 w-32"
                        /> */}
                <span className="">0.00</span>
              </div>
              <div className="flex items-center justify-start">
                <label className="block text-sm font-semibold w-32">
                  Project Cost
                </label>
                {/* <input
                          type="text"
                          className="border rounded-md px-4 py-2 mt-1 w-32"
                        /> */}
                <span className="">0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectSettings;
