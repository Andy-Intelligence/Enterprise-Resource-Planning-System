"use client";
import React, { useState } from "react";
import classNames from "classnames";

// Define the type for project data
interface ProjectData {
  name: string;
  contractor: string;
  client: string;
  working_time: string;
  document: File | null;
  description: string;
  project_manager: string;
  deadline: string;
  status: string;
  team_lead: string;
  team_members: string;
  budget: number;
}

// Define the type for client data
interface ClientData {
  id: string;
  name: string;
  projects: ProjectData[];
}

const AdminClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedClientId, setSelectedClientId] = useState<string>("");

  // Mock data for clients and their projects
  const clients: ClientData[] = [
    {
      id: "client1",
      name: "ABC Corporation",
      projects: [
        {
          name: "Project Alpha",
          contractor: "XYZ Constructions",
          client: "ABC Corporation",
          working_time: "9:00 AM - 5:00 PM",
          document: null,
          description: "This is a major infrastructure project.",
          project_manager: "John Doe",
          deadline: "2024-12-31",
          status: "active",
          team_lead: "Jane Smith",
          team_members: "Alice, Bob, Charlie",
          budget: 1000000,
        },
      ],
    },
    {
      id: "client2",
      name: "XYZ Industries",
      projects: [
        {
          name: "Project Beta",
          contractor: "ABC Builders",
          client: "XYZ Industries",
          working_time: "8:00 AM - 4:00 PM",
          document: null,
          description: "This project is focused on renewable energy.",
          project_manager: "Mary Johnson",
          deadline: "2024-06-30",
          status: "completed",
          team_lead: "Michael Lee",
          team_members: "David, Emma, Frank",
          budget: 2000000,
        },
      ],
    },
  ];

  // Get the selected client's data
  const selectedClient = clients.find(
    (client) => client.id === selectedClientId
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClientId(e.target.value);
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <nav className="bg-blue-700 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            Admin Client Portal
          </div>
          <div className="flex space-x-4">
            {[
              "dashboard",
              "project-updates",
              "feedback",
              "reports",
              "meetings",
              "documents",
              "notices",
              "projects",
            ].map((tab) => (
              <button
                key={tab}
                className={classNames(
                  "text-white hover:text-blue-200 transition",
                  { "font-bold": activeTab === tab }
                )}
                onClick={() => handleTabChange(tab)}
              >
                {tab
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Select Client</h2>
          <select
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={selectedClientId}
            onChange={handleClientChange}
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {selectedClient && (
          <>
            {activeTab === "dashboard" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <img
                      src="/path/to/main-project-image.jpg"
                      alt="Main Project"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Project Details</h3>
                    <p>
                      <strong>Name:</strong> {selectedClient.projects[0].name}
                    </p>
                    <p>
                      <strong>Contractor:</strong>{" "}
                      {selectedClient.projects[0].contractor}
                    </p>
                    <p>
                      <strong>Client:</strong> {selectedClient.name}
                    </p>
                    <p>
                      <strong>Working Time:</strong>{" "}
                      {selectedClient.projects[0].working_time}
                    </p>
                    <p>
                      <strong>Project Manager:</strong>{" "}
                      {selectedClient.projects[0].project_manager}
                    </p>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {selectedClient.projects[0].deadline}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {selectedClient.projects[0].status}
                    </p>
                    <p>
                      <strong>Team Lead:</strong>{" "}
                      {selectedClient.projects[0].team_lead}
                    </p>
                    <p>
                      <strong>Team Members:</strong>{" "}
                      {selectedClient.projects[0].team_members}
                    </p>
                    <p>
                      <strong>Budget:</strong> $
                      {selectedClient.projects[0].budget.toLocaleString()}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedClient.projects[0].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "project-updates" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Update Project</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Update Description
                    </label>
                    <textarea
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                      <option value="on-schedule">On Schedule</option>
                      <option value="behind-schedule">Behind Schedule</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    Submit Update
                  </button>
                </form>
              </div>
            )}

            {activeTab === "feedback" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Client Feedback</h2>
                <div className="space-y-4">
                  {/* Replace with dynamic feedback */}
                  <div className="p-4 bg-gray-100 rounded-lg shadow">
                    <p>
                      <strong>Client:</strong> {selectedClient.name}
                    </p>
                    <p>
                      <strong>Comments:</strong> Great work on the project! Keep
                      up the good progress.
                    </p>
                    <p>
                      <strong>Satisfaction:</strong> 5/5
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Submit Report</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Report Title
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Attach Report
                    </label>
                    <input
                      type="file"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    Submit Report
                  </button>
                </form>
              </div>
            )}

            {activeTab === "meetings" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Schedule Meeting</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Meeting Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Meeting Time
                    </label>
                    <input
                      type="time"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Purpose
                    </label>
                    <textarea
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    Request Meeting
                  </button>
                </form>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Upload Document</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Document Title
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Attach Document
                    </label>
                    <input
                      type="file"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    Submit Document
                  </button>
                </form>
              </div>
            )}

            {activeTab === "notices" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Post Notice</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notice Title
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notice Description
                    </label>
                    <textarea
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    Post Notice
                  </button>
                </form>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedClient.name} Projects
                </h2>
                <div className="space-y-4">
                  {selectedClient.projects.map((project, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg">
                      <h3 className="text-xl font-bold">{project.name}</h3>
                      <p>
                        <strong>Contractor:</strong> {project.contractor}
                      </p>
                      <p>
                        <strong>Deadline:</strong> {project.deadline}
                      </p>
                      <p>
                        <strong>Status:</strong> {project.status}
                      </p>
                      <p>
                        <strong>Budget:</strong> $
                        {project.budget.toLocaleString()}
                      </p>
                      <p>
                        <strong>Description:</strong> {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminClientPortal;
