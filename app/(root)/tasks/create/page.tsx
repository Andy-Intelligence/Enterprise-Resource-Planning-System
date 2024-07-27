import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CreateTaskDescription from "@/components/CreateTaskDescription";

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
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Task saved:", task);
    // Redirect or reset the form as needed
  };

  const handleDiscard = () => {
    // Handle discard logic here
    setTask({
      title: "",
      project: "",
      hoursPlanned: "",
      assignedTo: "",
      stage: "",
      description: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Tasks / New</div>
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
          <label className="block text-sm font-semibold mb-2">Task Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Task Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Project</label>
          <select
            name="project"
            value={task.project}
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
          <label className="block text-sm font-semibold mb-2">
            Hours Planned
          </label>
          <input
            type="number"
            name="hoursPlanned"
            value={task.hoursPlanned}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Hours Planned"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Assigned To
          </label>
          <select
            name="assignedTo"
            value={task.assignedTo}
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
          <label className="block text-sm font-semibold mb-2">Stage</label>
          <select
            name="stage"
            value={task.stage}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Stage</option>
            {stageOptions.map((stage, index) => (
              <option key={index} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
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
  );
};

export default NewTaskForm;

