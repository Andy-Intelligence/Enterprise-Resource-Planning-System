"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiX,
  FiFileText,
  FiPackage,
  FiClock,
  FiCalendar,
  FiFolder,
  FiUser,
} from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";

const TaskFormComponent = () => {
  const router = useRouter();
  const [task, setTask] = useState({
    name: "",
    description: "",
    material_requisition: "",
    material_consumed: "",
    material_planning: "",
    hours_planned: "",
    stage: "",
    deadline: "",
    project: "",
    assigned_to: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setTask({ ...task, [field]: value });
  };

  const handleSaveAfterTokenRefresh = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/projects/tasks/create/",
        task,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Task created:", response.data);
      router.push("/tasks");
    } catch (error) {
      console.error("Error creating task after token refresh:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/projects/tasks/create/",
        task,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Task created:", response.data);
      router.push("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        // Call handleSave again without passing an event
        handleSaveAfterTokenRefresh();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const handleDiscard = () => {
    router.push("/tasks");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-6 px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Create New Task</h1>
          </div>
          <div className="p-8">
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Task Name"
                  name="name"
                  value={task.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  icon={<FiFileText className="text-gray-400" />}
                />
                <FormField
                  label="Description"
                  name="description"
                  value={task.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  icon={<FiFileText className="text-gray-400" />}
                />
                <FormField
                  label="Material Requisition"
                  name="material_requisition"
                  value={task.material_requisition}
                  onChange={(e) =>
                    handleInputChange("material_requisition", e.target.value)
                  }
                  icon={<FiPackage className="text-gray-400" />}
                />
                <FormField
                  label="Material Consumed"
                  name="material_consumed"
                  value={task.material_consumed}
                  onChange={(e) =>
                    handleInputChange("material_consumed", e.target.value)
                  }
                  icon={<FiPackage className="text-gray-400" />}
                />
                <FormField
                  label="Material Planning"
                  name="material_planning"
                  value={task.material_planning}
                  onChange={(e) =>
                    handleInputChange("material_planning", e.target.value)
                  }
                  icon={<FiPackage className="text-gray-400" />}
                />
                <FormField
                  label="Hours Planned"
                  name="hours_planned"
                  type="datetime-local"
                  value={task.hours_planned}
                  onChange={(e) =>
                    handleInputChange("hours_planned", e.target.value)
                  }
                  icon={<FiClock className="text-gray-400" />}
                />
                <FormField
                  label="Stage"
                  name="stage"
                  value={task.stage}
                  onChange={(e) => handleInputChange("stage", e.target.value)}
                  options={[
                    { value: "", label: "Select Stage" },
                    { value: "Planning", label: "Planning" },
                    { value: "In Progress", label: "In Progress" },
                    { value: "Completed", label: "Completed" },
                  ]}
                  icon={<FiFileText className="text-gray-400" />}
                />
                <FormField
                  label="Deadline"
                  name="deadline"
                  type="datetime-local"
                  value={task.deadline}
                  onChange={(e) =>
                    handleInputChange("deadline", e.target.value)
                  }
                  icon={<FiCalendar className="text-gray-400" />}
                />
                <FormField
                  label="Project ID"
                  name="project"
                  type="number"
                  value={task.project}
                  onChange={(e) => handleInputChange("project", e.target.value)}
                  icon={<FiFolder className="text-gray-400" />}
                />
                <FormField
                  label="Assigned To (User ID)"
                  name="assigned_to"
                  type="number"
                  value={task.assigned_to}
                  onChange={(e) =>
                    handleInputChange("assigned_to", e.target.value)
                  }
                  icon={<FiUser className="text-gray-400" />}
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
              type="submit"
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
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
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
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
        />
      )}
    </div>
  </div>
);

export default TaskFormComponent;
