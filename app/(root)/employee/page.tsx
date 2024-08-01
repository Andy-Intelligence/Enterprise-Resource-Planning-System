"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CostHeadersTable from "@/components/CostHeadersTable";
import InventorysTable from "@/components/InventorysTable";
import EmployeesTable from "@/components/EmployeesTable";

interface Employee {
  employeeCode: string;
  image: string;
  employeeName: string;
  workEmail: string;
  department: string;
  status: string;
}

const EmployeePage: React.FC = () => {
  const router = useRouter();

  const employees: Employee[] = [
    {
      employeeCode: "EMP001",
      image: "string",
      employeeName: "Moge Dami",
      workEmail: "abc@gmail.com",
      department: "Mechanical",
      status: "Active",
    },
    {
      employeeCode: "EMP001",
      image: "string",
      employeeName: "Moge Dami",
      workEmail: "abc@gmail.com",
      department: "Electrical",
      status: "Active",
    },
    {
      employeeCode: "EMP001",
      image: "string",
      employeeName: "Moge Dami",
      workEmail: "abc@gmail.com",
      department: "Civil",
      status: "Active",
    },

    // Add more cost header entries as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Employee</div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => router.push("/employee/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <EmployeesTable employees={employees} />
      </div>
    </div>
  );
};

export default EmployeePage;
