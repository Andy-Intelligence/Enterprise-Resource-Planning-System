"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Employee {
  id: string;
  name: string;
}

const employees: Employee[] = [
  { id: "E001", name: "John Doe" },
  { id: "E002", name: "Jane Smith" },
  { id: "E003", name: "Alice Johnson" },
];

const CreatePayrollForm: React.FC = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    payStartDate: "",
    payEndDate: "",
    grossSalary: 0,
    netSalary: 0,
    annualGrossSalary: 0,
    allowance: 0,
    appraisalScore: 0,
    deductions: 0,
    annualDeductions: 0,
    annualNetSalary: 0,
    payDate: "",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEmployeeChange = (name: string) => {
    const selectedEmployee = employees.find((emp) => emp.name === name);
    setFormData({
      ...formData,
      employeeName: name,
      employeeId: selectedEmployee ? selectedEmployee.id : "",
    });
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    console.log("Saved Data: ", formData);
    // Add save logic here
  };

  const handleDiscard = () => {
    setFormData({
      employeeName: "",
      employeeId: "",
      designation: "",
      payStartDate: "",
      payEndDate: "",
      grossSalary: 0,
      netSalary: 0,
      annualGrossSalary: 0,
      allowance: 0,
      appraisalScore: 0,
      deductions: 0,
      annualDeductions: 0,
      annualNetSalary: 0,
      payDate: "",
    });
  };

  return (
    <div className="border rounded-lg p-4 relative">
      <div className="text-3xl font-bold mb-4">New Payroll</div>
      <div className="flex gap-2 items-center justify-between mb-4">
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleDiscard}
        >
          Discard
        </Button>
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <Label htmlFor="employeeName" className="font-bold">
              Employee Name
            </Label>
            <select
              id="employeeName"
              className="border rounded-md px-2 py-1"
              value={formData.employeeName}
              onChange={(e) => handleEmployeeChange(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <Label htmlFor="employeeId" className="font-bold">
              Employee ID
            </Label>
            <Input
              id="employeeId"
              type="text"
              value={formData.employeeId}
              readOnly
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="designation" className="font-bold">
              Designation
            </Label>
            <textarea
              id="designation"
              className="border rounded-md px-2 py-1 w-full"
              value={formData.designation}
              onChange={(e) => handleInputChange("designation", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="payStartDate" className="font-bold">
              Pay Start Date
            </Label>
            <Input
              id="payStartDate"
              type="date"
              value={formData.payStartDate}
              onChange={(e) =>
                handleInputChange("payStartDate", e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="payEndDate" className="font-bold">
              Pay End Date
            </Label>
            <Input
              id="payEndDate"
              type="date"
              value={formData.payEndDate}
              onChange={(e) => handleInputChange("payEndDate", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="grossSalary" className="font-bold">
              Gross Salary
            </Label>
            <Input
              id="grossSalary"
              type="number"
              value={formData.grossSalary}
              onChange={(e) =>
                handleInputChange("grossSalary", parseFloat(e.target.value))
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="netSalary" className="font-bold">
              Net Salary
            </Label>
            <Input
              id="netSalary"
              type="number"
              value={formData.netSalary}
              onChange={(e) =>
                handleInputChange("netSalary", parseFloat(e.target.value))
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="annualGrossSalary" className="font-bold">
              Annual Gross Salary
            </Label>
            <Input
              id="annualGrossSalary"
              type="number"
              value={formData.annualGrossSalary}
              onChange={(e) =>
                handleInputChange(
                  "annualGrossSalary",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="allowance" className="font-bold">
              Allowance
            </Label>
            <Input
              id="allowance"
              type="number"
              value={formData.allowance}
              onChange={(e) =>
                handleInputChange("allowance", parseFloat(e.target.value))
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="appraisalScore" className="font-bold">
              Appraisal Score
            </Label>
            <Input
              id="appraisalScore"
              type="number"
              value={formData.appraisalScore}
              onChange={(e) =>
                handleInputChange("appraisalScore", parseFloat(e.target.value))
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="deductions" className="font-bold">
              Deductions
            </Label>
            <Input
              id="deductions"
              type="number"
              value={formData.deductions}
              onChange={(e) =>
                handleInputChange("deductions", parseFloat(e.target.value))
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="annualDeductions" className="font-bold">
              Annual Deductions
            </Label>
            <Input
              id="annualDeductions"
              type="number"
              value={formData.annualDeductions}
              onChange={(e) =>
                handleInputChange(
                  "annualDeductions",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="annualNetSalary" className="font-bold">
              Annual Net Salary
            </Label>
            <Input
              id="annualNetSalary"
              type="number"
              value={formData.annualNetSalary}
              onChange={(e) =>
                handleInputChange("annualNetSalary", parseFloat(e.target.value))
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="payDate" className="font-bold">
              Pay Date
            </Label>
            <Input
              id="payDate"
              type="date"
              value={formData.payDate}
              onChange={(e) => handleInputChange("payDate", e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePayrollForm;
