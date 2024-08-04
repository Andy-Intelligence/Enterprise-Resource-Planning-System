"use client";

import CreateDescription from "@/components/CreateDescription";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX } from "react-icons/fi";

const CreateIssue: React.FC = () => {
  const router = useRouter();

  const [issue, setIssue] = useState({
    title: "",
    project: "",
    task: "",
    deadline: "",
    assignedTo: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSave = () => {
    console.log("Issue saved:", issue);
    // Handle save logic here
    router.push("/issues"); // Adjust this route as needed
  };

  const handleDiscard = () => {
    router.push("/issues"); // Adjust this route as needed
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create New Issue
        </h1>

        <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleSave}
          >
            <FiSave /> Save Issue
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
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              value={issue.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter issue title"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project
            </label>
            <select
              name="project"
              value={issue.project}
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
            <label className="block text-gray-700 font-medium mb-2">Task</label>
            <select
              name="task"
              value={issue.task}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Task</option>
              <option value="task1">Task 1</option>
              <option value="task2">Task 2</option>
              <option value="task3">Task 3</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={issue.deadline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Assigned To
            </label>
            <select
              name="assignedTo"
              value={issue.assignedTo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select User</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <CreateDescription
              value={issue.description}
              onChange={(value: any) =>
                setIssue({ ...issue, description: value })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
