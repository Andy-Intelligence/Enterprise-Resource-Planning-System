"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  const employees: Employee[] = [
    {
      employeeCode: "EMP001",
      image: "https://i.pravatar.cc/300",
      employeeName: "Moge Dami",
      workEmail: "abc@gmail.com",
      department: "Mechanical",
      status: "Active",
    },
    {
      employeeCode: "EMP002",
      image: "https://i.pravatar.cc/300",
      employeeName: "Jane Doe",
      workEmail: "jane@gmail.com",
      department: "Electrical",
      status: "Active",
    },
    {
      employeeCode: "EMP003",
      image: "https://i.pravatar.cc/300",
      employeeName: "John Smith",
      workEmail: "john@gmail.com",
      department: "Civil",
      status: "Inactive",
    },
    // Add more employee entries as needed
  ];

  const departmentTypes = ["Mechanical", "Electrical", "Civil"];

  const filteredEmployees = employees.filter(
    (employee) =>
      (filterType === "" || employee.department === filterType) &&
      (searchQuery === "" ||
        employee.employeeName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        employee.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/employee/create")}
        >
          <FiPlus /> Create Employee
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search employees..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <FiFilter className="text-gray-400 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-100 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">All Departments</option>
              {departmentTypes.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Employee</th>
                <th className="py-3 px-4 text-left">Employee Code</th>
                <th className="py-3 px-4 text-left">Work Email</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.employeeCode}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    router.push(`/employee/${employee.employeeCode}`)
                  }
                >
                  <td className="py-4 px-4 border-b">
                    <div className="flex items-center">
                      <img
                        src={employee.image}
                        alt={employee.employeeName}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span>{employee.employeeName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 border-b">
                    {employee.employeeCode}
                  </td>
                  <td className="py-4 px-4 border-b">{employee.workEmail}</td>
                  <td className="py-4 px-4 border-b">{employee.department}</td>
                  <td className="py-4 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
