"use client";

import CreateDescription from "@/components/CreateDescription";
import React, { useState } from "react";

const CreateIssue: React.FC = () => {
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
    // Handle save logic here
    console.log("Issue saved:", issue);
    // Redirect or reset the form as needed
  };

  const handleDiscard = () => {
    // Handle discard logic here
    setIssue({
      title: "",
      project: "",
      task: "",
      deadline: "",
      assignedTo: "",
      description: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Issues / New</div>
      <div className="mb-4">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={handleDiscard}
        >
          Discard
        </button>
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Issue Title
          </label>
          <input
            type="text"
            name="title"
            value={issue.title}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Issue Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Project</label>
          <select
            name="project"
            value={issue.project}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Project</option>
            <option value="project1">Project 1</option>
            <option value="project2">Project 2</option>
            <option value="project3">Project 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Task</label>
          <select
            name="task"
            value={issue.task}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Task</option>
            <option value="task1">Task 1</option>
            <option value="task2">Task 2</option>
            <option value="task3">Task 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={issue.deadline}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Assigned To
          </label>
          <select
            name="assignedTo"
            value={issue.assignedTo}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select User</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <CreateDescription
            value={issue.description}
            onChange={(value:any) => setIssue({ ...issue, description: value })}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateIssue;
