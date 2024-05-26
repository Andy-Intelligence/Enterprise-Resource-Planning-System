"use client";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import DataTableRow from "./DataTableRow";

const CreateProjectWorkPackage = () => {
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
    },
    {
      name: "Task 2",
      dayOfWeek: "Wednesday",
      workFrom: "10:00 AM",
      workTo: "6:00 PM",
      startDate: "2024-05-12",
    },
    {
      name: "Task 3",
      dayOfWeek: "Friday",
      workFrom: "8:00 AM",
      workTo: "4:00 PM",
      startDate: "2024-05-14",
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
    <table className="w-full border-collapse border border-gray-200 mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-200 px-4 py-2">Work Package</th>
          <th className="border border-gray-200 px-4 py-2">Product UOM</th>
          <th className="border border-gray-200 px-4 py-2">QTY</th>
          <th className="border border-gray-200 px-4 py-2">Price Unit</th>
          <th className="border border-gray-200 px-4 py-2">Price Subtotal</th>
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
          <DataTableRow
            key={index}
            data={row}
            onEdit={() => handleEdit(row)}
            onDelete={() => handleDelete(row)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CreateProjectWorkPackage;
