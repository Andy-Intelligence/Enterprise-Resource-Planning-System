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
import TimeScheduleRow from "./DataTableRow";
import { MdDelete } from "react-icons/md";

const CreateEditTimeSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [customerType, setCustomerType] = useState("individual");

  const handleCustomerTypeChange = (event: any) => {
    setCustomerType(event.target.value);
  };
  const handleManagerSelect = (event: any) => {
    if (event.target.value === "createandedit") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const timeScheduleData = [
    {
      name: "Task 1",
      dayOfWeek: "Monday",
      workFrom: "9:00 AM",
      workTo: "5:00 PM",
      startDate: "2024-05-10",
      endDate: "2024-05-15",
    },
    {
      name: "Task 2",
      dayOfWeek: "Wednesday",
      workFrom: "10:00 AM",
      workTo: "6:00 PM",
      startDate: "2024-05-12",
      endDate: "2024-05-17",
    },
    {
      name: "Task 3",
      dayOfWeek: "Friday",
      workFrom: "8:00 AM",
      workTo: "4:00 PM",
      startDate: "2024-05-14",
      endDate: "2024-05-19",
    },
    // Add more data as needed
  ];

  const [data, setData] = useState(timeScheduleData);
  const [showDefaultRow, setShowDefaultRow] = useState(false);

  const handleAddRow = () => {
    setShowDefaultRow(true);
  };
  const handleDeleteRow = () => {
    setShowDefaultRow(false);
  };

  const handleEdit = (editedRow:any) => {
    // Implement your logic to handle editing a row
    console.log("Editing row:", editedRow);
  };

  const handleDelete = (deletedRow:any) => {
    // Implement your logic to handle deleting a row
    console.log("Deleting row:", deletedRow);
    setData(data.filter((row) => row !== deletedRow));
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="text-3xl font-bold mb-4">Open : Working Time</div>
      <div className="mb-4">
        <button className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md">
          Save
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Discard
        </button>
      </div>
      <div className="flex flex-col">
        {/* Row 1: Name Input and Working Manager Select */}
        <div className="flex items-center mb-4">
          <div className="w-1/3 pr-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border rounded-md px-4 py-2 w-full"
              placeholder="Enter Name"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="working-manager"
              className="block text-sm font-semibold mb-2"
            >
              Workgroup Manager
            </label>
            <Select>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Working Manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-white">
                  <SelectLabel>Working Manager</SelectLabel>
                  <SelectItem value="manager1">Manager 1</SelectItem>
                  <SelectItem value="manager2">Manager 2</SelectItem>
                  <SelectItem value="manager3">Manager 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Table for Time Schedule */}
        <div>
          <div className="flex items-center justify-between">
            <div className="">
              {" "}
              <h2 className="text-lg font-semibold ">Working Time</h2>
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddRow}
            >
              Add Row
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">
                  Day of Week
                </th>
                <th className="border border-gray-200 px-4 py-2">Work From</th>
                <th className="border border-gray-200 px-4 py-2">Work To</th>
                <th className="border border-gray-200 px-4 py-2">
                  Starting Date
                </th>
                <th className="border border-gray-200 px-4 py-2">End Date</th>
                <th className="border border-gray-200 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {showDefaultRow && (
                <tr>
                  <td className="border border-gray-200 px-4 py-2 ">
                    <input type="text" className="w-[6rem]" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <input type="text" className="w-[6rem]" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <input type="text" className="w-[6rem]" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <input type="text" className="w-[6rem]" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <input type="text" className="w-[6rem]" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <input type="text" className="w-[6rem]" />
                  </td>
                  <td
                    className="border border-gray-200 px-4 py-2"
                    onClick={handleDeleteRow}
                  >
                    <MdDelete size={30} />
                  </td>
                </tr>
              )}
              {/* Table rows for time schedule data */}
              {timeScheduleData.map((row, index) => (
                <TimeScheduleRow
                  key={index}
                  data={row}
                  onEdit={() => handleEdit(row)}
                  onDelete={() => handleDelete(row)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateEditTimeSchedule;
