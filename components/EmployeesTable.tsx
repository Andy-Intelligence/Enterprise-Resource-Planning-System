"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Employee {
  employeeCode: string;
  image: string;
  employeeName: string;
  workEmail: string;
  department: string;
  status: string;
}

interface InventorysTableProps {
  employees: Employee[];
}

const EmployeesTable: React.FC<InventorysTableProps> = ({ employees }) => {
  const router = useRouter();
  const [filterType, setFilterType] = useState("");

  const handleRowClick = (id: string) => {
    router.push(`/employee/${id}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) => filterType === "" || employee.department === filterType
  );

  const departmentTypes = ["Mechanical", "Electrical", "Civil"];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Filter by Item Type</label>
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">All Types</option>
          {departmentTypes.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Select</th>
              <th className="py-2 px-4 text-start border-b">Employee Code</th>
              <th className="py-2 px-4 text-start border-b">Employee Image</th>
              <th className="py-2 px-4 text-start border-b">Employee Name</th>
              <th className="py-2 px-4 text-start border-b">Work Email</th>
              <th className="py-2 px-4 text-start border-b">Department</th>
              <th className="py-2 px-4 text-start border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.employeeCode}
                className="cursor-pointer"
                onClick={() => handleRowClick(employee.employeeCode)}
              >
                <td className="py-2 px-4 border-b text-center">
                  <input type="checkbox" />
                </td>
                <td className="py-2 px-4 border-b">{employee.employeeCode}</td>
                <td className="py-2 px-4 border-b">{employee.image}</td>
                <td className="py-2 px-4 border-b">{employee.employeeName}</td>
                <td className="py-2 px-4 border-b">{employee.workEmail}</td>
                <td className="py-2 px-4 border-b">{employee.department}</td>
                <td className="py-2 px-4 border-b">{employee.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable;
