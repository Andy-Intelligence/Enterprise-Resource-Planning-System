"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DataTableRow from "@/components/DataTableRow";
import { MdDelete } from "react-icons/md";

const CreateTaskTimeSheet = () => {
  const router = useRouter();

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
    },
    {
      name: "Task 2",
      dayOfWeek: "Wednesday",
      workFrom: "10:00 AM",
    },
    {
      name: "Task 3",
      dayOfWeek: "Friday",
      workFrom: "8:00 AM",
    },
    // Add more data as needed
  ];

  const [data, setData] = useState(timeScheduleData);
  const [showDefaultRow, setShowDefaultRow] = useState<any>(false);

  const handleAddRow = () => {
    setShowDefaultRow(true);
  };
  const handleDeleteRow = () => {
    setShowDefaultRow(false);
  };

  const handleEdit = (editedRow: any) => {
    // Implement your logic to handle editing a row
    console.log("Editing row:", editedRow);
  };

  const handleDelete = (deletedRow: any) => {
    // Implement your logic to handle deleting a row
    console.log("Deleting row:", deletedRow);
    setData(data.filter((row) => row !== deletedRow));
  };

  return (
    <div className="container mx-auto p-4">
    
      <div className="flex justify-between mb-4">
        <div
          className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer select-none"
          onClick={()=>setShowDefaultRow(!showDefaultRow)}
        >
          Create
        </div>
      
      </div>
      <div className="">
        <table className="w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Date</th>
              <th className="border border-gray-200 px-4 py-2">User</th>
              <th className="border border-gray-200 px-4 py-2">Description</th>
              <th className="border border-gray-200 px-4 py-2">Duration</th>
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
              <DataTableRow
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
  );
};

export default CreateTaskTimeSheet;
