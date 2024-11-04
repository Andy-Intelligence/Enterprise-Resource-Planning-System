"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiX,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiPercent,
} from "react-icons/fi";

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
  const router = useRouter();
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saved Data: ", formData);
    // Add save logic here
    router.push("/payroll");
  };

  const handleDiscard = () => {
    router.push("/payroll");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-6 px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">New Payroll</h1>
          </div>
          <div className="p-8">
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Employee Name"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={(e) => handleEmployeeChange(e.target.value)}
                  options={[
                    { value: "", label: "Select Employee" },
                    ...employees.map((emp) => ({
                      value: emp.name,
                      label: emp.name,
                    })),
                  ]}
                  icon={<FiUser className="text-gray-400" />}
                />
                <FormField
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={() => {}}
                  readOnly
                  icon={<FiUser className="text-gray-400" />}
                />
                <FormField
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={(e) =>
                    handleInputChange("designation", e.target.value)
                  }
                  icon={<FiBriefcase className="text-gray-400" />}
                />
                <FormField
                  label="Pay Start Date"
                  name="payStartDate"
                  type="date"
                  value={formData.payStartDate}
                  onChange={(e) =>
                    handleInputChange("payStartDate", e.target.value)
                  }
                  icon={<FiCalendar className="text-gray-400" />}
                />
                <FormField
                  label="Pay End Date"
                  name="payEndDate"
                  type="date"
                  value={formData.payEndDate}
                  onChange={(e) =>
                    handleInputChange("payEndDate", e.target.value)
                  }
                  icon={<FiCalendar className="text-gray-400" />}
                />
                <FormField
                  label="Gross Salary"
                  name="grossSalary"
                  type="number"
                  value={formData.grossSalary}
                  onChange={(e) =>
                    handleInputChange("grossSalary", parseFloat(e.target.value))
                  }
                  icon={<FiDollarSign className="text-gray-400" />}
                />
                <FormField
                  label="Net Salary"
                  name="netSalary"
                  type="number"
                  value={formData.netSalary}
                  onChange={(e) =>
                    handleInputChange("netSalary", parseFloat(e.target.value))
                  }
                  icon={<FiDollarSign className="text-gray-400" />}
                />
                <FormField
                  label="Annual Gross Salary"
                  name="annualGrossSalary"
                  type="number"
                  value={formData.annualGrossSalary}
                  onChange={(e) =>
                    handleInputChange(
                      "annualGrossSalary",
                      parseFloat(e.target.value)
                    )
                  }
                  icon={<FiDollarSign className="text-gray-400" />}
                />
                <FormField
                  label="Allowance"
                  name="allowance"
                  type="number"
                  value={formData.allowance}
                  onChange={(e) =>
                    handleInputChange("allowance", parseFloat(e.target.value))
                  }
                  icon={<FiDollarSign className="text-gray-400" />}
                />
                <FormField
                  label="Appraisal Score"
                  name="appraisalScore"
                  type="number"
                  value={formData.appraisalScore}
                  onChange={(e) =>
                    handleInputChange(
                      "appraisalScore",
                      parseFloat(e.target.value)
                    )
                  }
                  icon={<FiPercent className="text-gray-400" />}
                />
                <FormField
                  label="Deductions"
                  name="deductions"
                  type="number"
                  value={formData.deductions}
                  onChange={(e) =>
                    handleInputChange("deductions", parseFloat(e.target.value))
                  }
                  icon={<FiDollarSign className="text-gray-400" />}
                />
                <FormField
                  label="Annual Deductions"
                  name="annualDeductions"
                  type="number"
                  value={formData.annualDeductions}
                  onChange={(e) =>
                    handleInputChange(
                      "annualDeductions",
                      parseFloat(e.target.value)
                    )
                  }
                  icon={<FiDollarSign className="text-gray-400" />}
                />
                <FormField
                  label="Annual Net Salary"
                  name="annualNetSalary"
                  type="number"
                  value={formData.annualNetSalary}
                  onChange={(e) =>
                    handleInputChange(
                      "annualNetSalary",
                      parseFloat(e.target.value)
                    )
                  }
                  icon={<FiDollarSign className="text-gray-400" />}
                />
                <FormField
                  label="Pay Date"
                  name="payDate"
                  type="date"
                  value={formData.payDate}
                  onChange={(e) => handleInputChange("payDate", e.target.value)}
                  icon={<FiCalendar className="text-gray-400" />}
                />
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-6 flex justify-end space-x-4">
            <button
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              onClick={handleDiscard}
            >
              <FiX className="mr-2" /> Discard
            </button>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
              onClick={handleSave}
            >
              <FiSave className="mr-2" /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
  readOnly?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
  icon,
  readOnly = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            readOnly ? "bg-gray-100" : ""
          }`}
        />
      )}
    </div>
  </div>
);

export default CreatePayrollForm;
