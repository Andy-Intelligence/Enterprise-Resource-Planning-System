"use client";

import React, { useState } from "react";
import { FiSave, FiX, FiFileText, FiPlus, FiTrash2 } from "react-icons/fi";

interface BudgetRow {
  id: string;
  budgetaryPosition: string;
  startDate: string;
  endDate: string;
  paidDate: string;
  plannedAmount: number;
  practicalAmount: number;
}

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Confirmed", value: "confirmed" },
];

const CreateBudgetComponent: React.FC = () => {
  const [formStatus, setFormStatus] = useState<string>("draft");
  const [budgetData, setBudgetData] = useState<BudgetRow[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRow, setNewRow] = useState<BudgetRow>({
    id: "",
    budgetaryPosition: "",
    startDate: "",
    endDate: "",
    paidDate: "",
    plannedAmount: 0,
    practicalAmount: 0,
  });
  const [budgetDetails, setBudgetDetails] = useState({
    budget: "",
    project: "",
  });

  const handleAddItem = () => {
    setBudgetData([
      ...budgetData,
      { ...newRow, id: (budgetData.length + 1).toString() },
    ]);
    setIsDialogOpen(false);
    setNewRow({
      id: "",
      budgetaryPosition: "",
      startDate: "",
      endDate: "",
      paidDate: "",
      plannedAmount: 0,
      practicalAmount: 0,
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewRow({ ...newRow, [field]: value });
  };

  const handleBudgetDetailsChange = (field: string, value: string) => {
    setBudgetDetails({ ...budgetDetails, [field]: value });
  };

  const calculateTotal = (field: keyof BudgetRow) => {
    return budgetData.reduce((sum, row) => sum + Number(row[field]), 0);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Budget</h1>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
              <FiSave /> Save
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2">
              <FiX /> Discard
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
              <FiFileText /> Draft
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                className={`px-4 py-2 rounded-md transition-colors ${
                  formStatus === status.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setFormStatus(status.value)}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FormField
            label="Budget"
            name="budget"
            value={budgetDetails.budget}
            onChange={(e) =>
              handleBudgetDetailsChange("budget", e.target.value)
            }
          />
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project
            </label>
            <select
              name="project"
              value={budgetDetails.project}
              onChange={(e) =>
                handleBudgetDetailsChange("project", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Project</option>
              <option value="project1">Project 1</option>
              <option value="project2">Project 2</option>
              <option value="project3">Project 3</option>
            </select>
          </div>
        </form>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Budget Items</h2>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budgetary Position
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Planned Amount
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Practical Amount
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgetData.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {item.budgetaryPosition}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {item.startDate}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {item.endDate}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {item.paidDate}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    ${item.plannedAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    ${item.practicalAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    <button
                      onClick={() =>
                        setBudgetData(budgetData.filter((_, i) => i !== index))
                      }
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td colSpan={4} className="py-3 px-4 font-bold text-right">
                  Total:
                </td>
                <td className="py-3 px-4 font-bold">
                  ${calculateTotal("plannedAmount").toFixed(2)}
                </td>
                <td className="py-3 px-4 font-bold">
                  ${calculateTotal("practicalAmount").toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <FiPlus /> Add Item
        </button>

        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Add New Budget Item
              </h2>
              <FormField
                label="Budgetary Position"
                name="budgetaryPosition"
                value={newRow.budgetaryPosition}
                onChange={(e) =>
                  handleInputChange("budgetaryPosition", e.target.value)
                }
              />
              <FormField
                label="Start Date"
                name="startDate"
                type="date"
                value={newRow.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
              <FormField
                label="End Date"
                name="endDate"
                type="date"
                value={newRow.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
              <FormField
                label="Paid Date"
                name="paidDate"
                type="date"
                value={newRow.paidDate}
                onChange={(e) => handleInputChange("paidDate", e.target.value)}
              />
              <FormField
                label="Planned Amount"
                name="plannedAmount"
                type="number"
                value={newRow.plannedAmount}
                onChange={(e) =>
                  handleInputChange("plannedAmount", parseFloat(e.target.value))
                }
              />
              <FormField
                label="Practical Amount"
                name="practicalAmount"
                type="number"
                value={newRow.practicalAmount}
                onChange={(e) =>
                  handleInputChange(
                    "practicalAmount",
                    parseFloat(e.target.value)
                  )
                }
              />
              <div className="flex justify-end mt-6 gap-3">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleAddItem}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default CreateBudgetComponent;
