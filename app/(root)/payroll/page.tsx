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
    <div>
      hello
    </div>
  );
};

export default CreatePayrollForm;
