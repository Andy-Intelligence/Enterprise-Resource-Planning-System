"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiX,
  FiMapPin,
  FiGlobe,
  FiCalendar,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import { IoDocumentsSharp, IoRadioButtonOn } from "react-icons/io5";
import {
  FaTasks,
  FaRegCalendarAlt,
  FaBuilding,
  FaUserTie,
} from "react-icons/fa";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";

interface ProjectData {
  name: string;
  contractor: string;
  client: string;
  working_time: string;
  document: File | null;
  description: string;
  project_manager: string; // Make sure this is a string
  budget?: number;
  deadline: string; // Make sure this is a string
  status: string; // Make sure this is a string
  team_lead: string; // Make sure this is a string
  team_members: string; // Make sure this is a string
}

const NewProjectForm: React.FC = () => {
  const router = useRouter();
const [projectData, setProjectData] = useState<ProjectData>({
  name: "",
  contractor: "",
  client: "",
  working_time: "",
  document: null,
  description: "", // Initialize as an empty string
  project_manager: "", // Initialize as an empty string
  deadline: "", // Initialize as an empty string
  status: "active", // Provide a default value like "active"
  team_lead: "", // Initialize as an empty string
  team_members: "", // Initialize as an empty string
  budget: 0, // Optional, so can be undefined
});


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setProjectData({ ...projectData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProjectData({ ...projectData, document: e.target.files[0] });
    }
  };

  const handleSave = async () => {
    try {
      const accessToken = await getAccessToken();
      const formData = new FormData();
      formData.append("name", projectData.name);
      formData.append("contractor", projectData.contractor);
      formData.append("client", projectData.client);
      formData.append("working_time", projectData.working_time);
      if (projectData.document) {
        formData.append("document", projectData.document);
      }

      await axios.post(
        "https://erp-backend-nv09.onrender.com/api/projects/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      router.push("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        handleSave();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const handleDiscard = () => {
    router.push("/projects");
  };

  const QuickStatsCard: React.FC<{
    icon: React.ElementType;
    label: string;
    count: number;
  }> = ({ icon: Icon, label, count }) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-full">
        <Icon className="text-blue-600 text-xl" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{count}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-6 px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={handleDiscard}
              >
                <FiX className="mr-2" /> Discard
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={handleSave}
              >
                <FiSave className="mr-2" /> Save Project
              </Button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <Input
                  type="text"
                  name="name"
                  value={projectData.name}
                  onChange={handleInputChange}
                  placeholder="Project Name"
                  className="text-2xl font-semibold mb-4 w-full"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormSelect
                    label="Contractor"
                    name="contractor"
                    value={projectData.contractor}
                    onChange={(value) =>
                      handleSelectChange("contractor", value)
                    }
                    icon={<FaBuilding className="text-gray-400" />}
                    options={[
                      { value: "1", label: "Contractor 1" },
                      { value: "2", label: "Contractor 2" },
                      { value: "3", label: "Contractor 3" },
                    ]}
                  />
                  <FormSelect
                    label="Client"
                    name="client"
                    value={projectData.client}
                    onChange={(value) => handleSelectChange("client", value)}
                    icon={<FiGlobe className="text-gray-400" />}
                    options={[
                      { value: "1", label: "Client 1" },
                      { value: "2", label: "Client 2" },
                      { value: "3", label: "Client 3" },
                    ]}
                  />
                  <FormField
                    label="Working Time"
                    name="working_time"
                    type="datetime-local"
                    value={projectData.working_time}
                    onChange={handleInputChange}
                    icon={<FiCalendar className="text-gray-400" />}
                  />
                  <div>
                    <label
                      htmlFor="document"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Document
                    </label>
                    <input
                      type="file"
                      id="document"
                      name="document"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Quick Stats
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <QuickStatsCard
                    icon={IoDocumentsSharp}
                    label="Documents"
                    count={1}
                  />
                  <QuickStatsCard icon={FaTasks} label="Tasks" count={1} />
                  <QuickStatsCard
                    icon={AiOutlineIssuesClose}
                    label="Issues"
                    count={1}
                  />
                  <QuickStatsCard
                    icon={FaRegCalendarAlt}
                    label="TimeSheets"
                    count={1}
                  />
                </div>
                <div className="flex items-center text-green-600 mt-4">
                  <IoRadioButtonOn size={24} className="mr-2" />
                  <span className="font-medium">Active</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter project description"
              ></textarea>
            </div>

            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4">
                <TabsTrigger
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 px-4 py-2 rounded-md mr-2"
                  value="settings"
                >
                  Project Settings
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 px-4 py-2 rounded-md"
                  value="team"
                >
                  Project Team
                </TabsTrigger>
              </TabsList>
              <TabsContent value="settings">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormSelect
                    label="Project Manager"
                    name="project_manager"
                    value={projectData.project_manager}
                    onChange={(value) =>
                      handleSelectChange("project_manager", value)
                    }
                    icon={<FaUserTie className="text-gray-400" />}
                    options={[
                      { value: "1", label: "Manager 1" },
                      { value: "2", label: "Manager 2" },
                      { value: "3", label: "Manager 3" },
                    ]}
                  />
                  <FormField
                    label="Budget"
                    name="budget"
                    type="number"
                    value={projectData.budget ?? 0} // Default to 0 if undefined
                    onChange={handleInputChange}
                    icon={<FiDollarSign className="text-gray-400" />}
                  />

                  <FormField
                    label="Deadline"
                    name="deadline"
                    type="datetime-local"
                    value={projectData.deadline}
                    onChange={handleInputChange}
                    icon={<FiClock className="text-gray-400" />}
                  />
                  <FormSelect
                    label="Status"
                    name="status"
                    value={projectData?.status}
                    onChange={(value) => handleSelectChange("status", value)}
                    icon={<IoRadioButtonOn className="text-gray-400" />}
                    options={[
                      { value: "active", label: "Active" },
                      { value: "on_hold", label: "On Hold" },
                      { value: "completed", label: "Completed" },
                    ]}
                  />
                </div>
              </TabsContent>
              <TabsContent value="team">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormSelect
                    label="Team Lead"
                    name="team_lead"
                    value={projectData.team_lead}
                    onChange={(value) => handleSelectChange("team_lead", value)}
                    icon={<FaUserTie className="text-gray-400" />}
                    options={[
                      { value: "1", label: "Team Lead 1" },
                      { value: "2", label: "Team Lead 2" },
                      { value: "3", label: "Team Lead 3" },
                    ]}
                  />
                  <FormSelect
                    label="Team Members"
                    name="team_members"
                    value={projectData.team_members}
                    onChange={(value) =>
                      handleSelectChange("team_members", value)
                    }
                    icon={<FaUserTie className="text-gray-400" />}
                    options={[
                      { value: "1", label: "Member 1" },
                      { value: "2", label: "Member 2" },
                      { value: "3", label: "Member 3" },
                    ]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
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
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
    </div>
  </div>
);

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  options: { value: string; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  icon,
  options,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <Select onValueChange={onChange} value={value} name={name}>
        <SelectTrigger className="w-full pl-10">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
    </div>
  </div>
);

export default NewProjectForm;
