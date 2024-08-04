"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CreateTaskDescription from "@/components/CreateTaskDescription";
import { FiSave, FiX } from "react-icons/fi";

const stageOptions = [
  "Planning and Design",
  "Site Preparation",
  "Foundation Construction",
  "Superstructure Construction",
  "Roofing",
  "Exterior Walls and Cladding",
  "Interior Walls and Partitions",
  "Installation of Doors and Windows",
  "Electrical and Plumbing Rough-in",
  "HVAC Installation",
  "Insulation and Drywall",
  "Interior Finishes (flooring, painting, etc.)",
  "Exterior Finishes (siding, landscaping, etc.)",
  "Fixture and Appliance Installation",
  "Final Inspections and Punch List",
  "Project Handover and Occupancy",
];

const NewTaskForm: React.FC = () => {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    project: "",
    hoursPlanned: "",
    assignedTo: "",
    stage: "",
    description: "",
    deadline: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSave = () => {
    console.log("Task saved:", task);
    // Handle save logic here
    router.push("/tasks"); // Adjust this route as needed
  };

  const handleDiscard = () => {
    setTask({
      title: "",
      project: "",
      hoursPlanned: "",
      assignedTo: "",
      stage: "",
      description: "",
      deadline: "",
    });
    router.push("/tasks"); // Adjust this route as needed
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create New Task
        </h1>

        <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleSave}
          >
            <FiSave /> Save Task
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            onClick={handleDiscard}
          >
            <FiX /> Discard
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project
            </label>
            <select
              name="project"
              value={task.project}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Project</option>
              <option value="project1">Project 1</option>
              <option value="project2">Project 2</option>
              <option value="project3">Project 3</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Hours Planned
            </label>
            <input
              type="number"
              name="hoursPlanned"
              value={task.hoursPlanned}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter planned hours"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Assigned To
            </label>
            <select
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select User</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Stage
            </label>
            <select
              name="stage"
              value={task.stage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Stage</option>
              {stageOptions.map((stage, index) => (
                <option key={index} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <CreateTaskDescription
              value={task.description}
              onChange={(value: string) =>
                setTask({ ...task, description: value })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskForm;
