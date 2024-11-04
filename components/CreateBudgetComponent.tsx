




"use client";

import React, { useState, useEffect } from "react";
import { FiSave, FiX, FiFileText, FiPlus, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BudgetRow {
  id: string;
  budget_position: string;
  start_date: string;
  end_date: string;
  paid_date: string;
  planned_amount: number;
  practical_amount: number;
}

interface Project {
  id: number;
  name: string;
}

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Confirmed", value: "confirmed" },
];

const CreateBudgetComponent: React.FC = () => {
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<string>("draft");
  const [budgetData, setBudgetData] = useState<BudgetRow[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRow, setNewRow] = useState<BudgetRow>({
    id: "",
    budget_position: "",
    start_date: "",
    end_date: "",
    paid_date: "",
    planned_amount: 0,
    practical_amount: 0,
  });
  const [budgetDetails, setBudgetDetails] = useState({
    budget_name: "",
    project: "",
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/projects/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchProjects();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        setError("Session expired. Please log in again.");
      }
    }
  };

  const handleAddItem = () => {
    setBudgetData([
      ...budgetData,
      { ...newRow, id: (budgetData.length + 1).toString() },
    ]);
    setIsDialogOpen(false);
    setNewRow({
      id: "",
      budget_position: "",
      start_date: "",
      end_date: "",
      paid_date: "",
      planned_amount: 0,
      practical_amount: 0,
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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/budgets/",
        {
          project: parseInt(budgetDetails.project),
          budget_name: budgetDetails.budget_name,
          status: formStatus,
          budget_items: budgetData.map((item) => ({
            budget_position: item.budget_position,
            start_date: item.start_date,
            end_date: item.end_date,
            paid_date: item.paid_date,
            planned_amount: item.planned_amount,
            practical_amount: item.practical_amount,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Budget created successfully:", response.data);
      router.push("/budgets"); // Redirect to the budgets list page
    } catch (error) {
      console.error("Error creating budget:", error);
      handleTokenRefresh(error);
      setError("Failed to create budget. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Budget</h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              <FiSave /> {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
              onClick={() => router.push("/budgets")}
            >
              <FiX /> Discard
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              onClick={() => setFormStatus("draft")}
            >
              <FiFileText /> Draft
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                className={`px-4 py-2 rounded-md transition-colors ${
                  formStatus === status.value
                    ? "bg-green-600 text-white"
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
            label="Budget Name"
            name="budget_name"
            value={budgetDetails.budget_name}
            onChange={(e) =>
              handleBudgetDetailsChange("budget_name", e.target.value)
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((row, index) => (
                <tr key={row.id}>
                  <td className="py-3 px-4 border-b">{row.budget_position}</td>
                  <td className="py-3 px-4 border-b">{row.start_date}</td>
                  <td className="py-3 px-4 border-b">{row.end_date}</td>
                  <td className="py-3 px-4 border-b">{row.paid_date}</td>
                  <td className="py-3 px-4 border-b">{row.planned_amount}</td>
                  <td className="py-3 px-4 border-b">{row.practical_amount}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() =>
                        setBudgetData(budgetData.filter((_, i) => i !== index))
                      }
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <FiPlus /> Add Item
        </button>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Add New Budget Item
              </h3>
              <div className="space-y-4">
                <FormField
                  label="Budgetary Position"
                  name="budget_position"
                  value={newRow.budget_position}
                  onChange={(e) =>
                    handleInputChange("budget_position", e.target.value)
                  }
                />
                <FormField
                  label="Start Date"
                  name="start_date"
                  type="date"
                  value={newRow.start_date}
                  onChange={(e) =>
                    handleInputChange("start_date", e.target.value)
                  }
                />
                <FormField
                  label="End Date"
                  name="end_date"
                  type="date"
                  value={newRow.end_date}
                  onChange={(e) =>
                    handleInputChange("end_date", e.target.value)
                  }
                />
                <FormField
                  label="Paid Date"
                  name="paid_date"
                  type="date"
                  value={newRow.paid_date}
                  onChange={(e) =>
                    handleInputChange("paid_date", e.target.value)
                  }
                />
                <FormField
                  label="Planned Amount"
                  name="planned_amount"
                  type="number"
                  value={newRow.planned_amount}
                  onChange={(e) =>
                    handleInputChange("planned_amount", Number(e.target.value))
                  }
                />
                <FormField
                  label="Practical Amount"
                  name="practical_amount"
                  type="number"
                  value={newRow.practical_amount}
                  onChange={(e) =>
                    handleInputChange(
                      "practical_amount",
                      Number(e.target.value)
                    )
                  }
                />
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
          <div className="mt-4 space-y-2">
            <div>
              <strong>Total Planned Amount:</strong>{" "}
              {calculateTotal("planned_amount")}
            </div>
            <div>
              <strong>Total Practical Amount:</strong>{" "}
              {calculateTotal("practical_amount")}
            </div>
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default CreateBudgetComponent;
