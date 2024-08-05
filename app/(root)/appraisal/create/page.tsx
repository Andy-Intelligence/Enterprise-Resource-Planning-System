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

const appraisers: Employee[] = [
  { id: "A001", name: "Manager A" },
  { id: "A002", name: "Manager B" },
  { id: "A003", name: "Manager C" },
];

const CreateAppraisalForm: React.FC = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    appraisalBy: "",
    appraisalScore: 0,
    appraisalDate: "",
    comments: "",
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
      appraisalBy: "",
      appraisalScore: 0,
      appraisalDate: "",
      comments: "",
    });
  };

  return (
    <div className="border rounded-lg p-4 relative">
      <div className="text-3xl font-bold mb-4">New Appraisal</div>
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
            <Label htmlFor="appraisalBy" className="font-bold">
              Appraisal By
            </Label>
            <select
              id="appraisalBy"
              className="border rounded-md px-2 py-1"
              value={formData.appraisalBy}
              onChange={(e) => handleInputChange("appraisalBy", e.target.value)}
            >
              <option value="">Select Appraiser</option>
              {appraisers.map((app) => (
                <option key={app.id} value={app.name}>
                  {app.name}
                </option>
              ))}
            </select>
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
            <Label htmlFor="appraisalDate" className="font-bold">
              Appraisal Date
            </Label>
            <Input
              id="appraisalDate"
              type="date"
              value={formData.appraisalDate}
              onChange={(e) =>
                handleInputChange("appraisalDate", e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="comments" className="font-bold">
              Comments
            </Label>
            <textarea
              id="comments"
              className="border rounded-md px-2 py-1 w-full"
              value={formData.comments}
              onChange={(e) => handleInputChange("comments", e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAppraisalForm;
