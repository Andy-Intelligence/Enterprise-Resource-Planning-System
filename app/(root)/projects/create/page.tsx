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

interface ProjectData {
  name: string;
  manager: string;
  subContractor: string;
  client: string;
  startDate: string;
  endDate: string;
  budget: string;
  timeScheduling: string;
  description: string;
}

const NewProjectForm: React.FC = () => {
  const router = useRouter();
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    manager: "",
    subContractor: "",
    client: "",
    startDate: "",
    endDate: "",
    budget: "",
    timeScheduling: "",
    description: "",
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

  const handleSave = () => {
    console.log("Project saved:", projectData);
    router.push("/projects");
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
                    label="Project Manager"
                    name="manager"
                    value={projectData.manager}
                    onChange={(value) => handleSelectChange("manager", value)}
                    icon={<FaBuilding className="text-gray-400" />}
                    options={[
                      { value: "manager1", label: "Manager 1" },
                      { value: "manager2", label: "Manager 2" },
                      { value: "manager3", label: "Manager 3" },
                    ]}
                  />
                  <FormSelect
                    label="Sub Contractor"
                    name="subContractor"
                    value={projectData.subContractor}
                    onChange={(value) =>
                      handleSelectChange("subContractor", value)
                    }
                    icon={<FaUserTie className="text-gray-400" />}
                    options={[
                      { value: "sub1", label: "Sub Contractor 1" },
                      { value: "sub2", label: "Sub Contractor 2" },
                      { value: "sub3", label: "Sub Contractor 3" },
                    ]}
                  />
                  <FormSelect
                    label="Client"
                    name="client"
                    value={projectData.client}
                    onChange={(value) => handleSelectChange("client", value)}
                    icon={<FiGlobe className="text-gray-400" />}
                    options={[
                      { value: "client1", label: "Client 1" },
                      { value: "client2", label: "Client 2" },
                      { value: "client3", label: "Client 3" },
                    ]}
                  />
                  <FormField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={projectData.startDate}
                    onChange={handleInputChange}
                    icon={<FiCalendar className="text-gray-400" />}
                  />
                  <FormField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={projectData.endDate}
                    onChange={handleInputChange}
                    icon={<FiCalendar className="text-gray-400" />}
                  />
                  <FormSelect
                    label="Budget"
                    name="budget"
                    value={projectData.budget}
                    onChange={(value) => handleSelectChange("budget", value)}
                    icon={<FiDollarSign className="text-gray-400" />}
                    options={[
                      { value: "budget1", label: "Budget 1" },
                      { value: "budget2", label: "Budget 2" },
                      { value: "budget3", label: "Budget 3" },
                    ]}
                  />
                  <FormSelect
                    label="Time Scheduling"
                    name="timeScheduling"
                    value={projectData.timeScheduling}
                    onChange={(value) =>
                      handleSelectChange("timeScheduling", value)
                    }
                    icon={<FiClock className="text-gray-400" />}
                    options={[
                      { value: "schedule1", label: "Schedule 1" },
                      { value: "schedule2", label: "Schedule 2" },
                      { value: "schedule3", label: "Schedule 3" },
                    ]}
                  />
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
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 px-4 py-2 rounded-md mr-2"
                  value="team"
                >
                  Team
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 px-4 py-2 rounded-md"
                  value="documents"
                >
                  Documents
                </TabsTrigger>
              </TabsList>
              <TabsContent value="settings">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Project Settings
                </h2>
                {/* Add your project settings content here */}
              </TabsContent>
              <TabsContent value="team">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Team Members
                </h2>
                {/* Add your team management content here */}
              </TabsContent>
              <TabsContent value="documents">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Project Documents
                </h2>
                {/* Add your document management content here */}
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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
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
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
      />
    </div>
  </div>
);

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
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
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
        >
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
    </div>
  </div>
);

export default NewProjectForm;
