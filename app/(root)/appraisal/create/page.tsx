

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiX,
  FiUser,
  FiCalendar,
  FiPercent,
  FiMessageSquare,
} from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
}

const CreateAppraisalForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    appraisalBy: "",
    appraisalScore: 0,
    appraisalDate: "",
    comments: "",
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [appraisers, setAppraisers] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
    fetchAppraisers();
  }, []);

  const fetchEmployees = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/auths/employees/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      handleTokenRefresh(error);
    }
  };

  const fetchAppraisers = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/auths/employees/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAppraisers(response.data);
    } catch (error) {
      console.error("Error fetching appraisers:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchEmployees();
        fetchAppraisers();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        setError("Session expired. Please log in again.");
      }
    }
  };

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/payrolls/appraisals/",
        {
          employee: formData.employeeId,
          appraisedBy: formData.appraisalBy,
          appraisalDate: formData.appraisalDate,
          score: formData.appraisalScore,
          comments: formData.comments,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Appraisal created successfully:", response.data);
      router.push("/appraisals");
    } catch (error) {
      console.error("Error creating appraisal:", error);
      handleTokenRefresh(error);
      setError("Failed to create appraisal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    router.push("/appraisals");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-green-600 text-white py-6 px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">New Appraisal</h1>
          </div>
          <div className="p-8">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
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
                  label="Appraisal By"
                  name="appraisalBy"
                  value={formData.appraisalBy}
                  onChange={(e) =>
                    handleInputChange("appraisalBy", e.target.value)
                  }
                  options={[
                    { value: "", label: "Select Appraiser" },
                    ...appraisers.map((app) => ({
                      value: app.id,
                      label: app.name,
                    })),
                  ]}
                  icon={<FiUser className="text-gray-400" />}
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
                  label="Appraisal Date"
                  name="appraisalDate"
                  type="date"
                  value={formData.appraisalDate}
                  onChange={(e) =>
                    handleInputChange("appraisalDate", e.target.value)
                  }
                  icon={<FiCalendar className="text-gray-400" />}
                />
                <div className="col-span-2">
                  <FormField
                    label="Comments"
                    name="comments"
                    value={formData.comments}
                    onChange={(e) =>
                      handleInputChange("comments", e.target.value)
                    }
                    isTextarea
                    icon={<FiMessageSquare className="text-gray-400" />}
                  />
                </div>
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
              disabled={isLoading}
            >
              <FiSave className="mr-2" /> {isLoading ? "Saving..." : "Save"}
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
  readOnly?: boolean;
  isTextarea?: boolean;
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
  isTextarea = false,
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
      ) : isTextarea ? (
        <textarea
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
          rows={4}
        />
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
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
            readOnly ? "bg-gray-100" : ""
          }`}
        />
      )}
    </div>
  </div>
);

export default CreateAppraisalForm;