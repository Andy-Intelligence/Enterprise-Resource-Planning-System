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

const ClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Mock data for client and their projects (as a single client view)
  const client: ClientData = {
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
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <nav className="bg-blue-700 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-white text-xl font-bold">
            {client.name} Portal
          </div>
          <div className="flex space-x-4">
            {[
              "dashboard",
              "projects",
              "meetings",
              "documents",
              "notices",
              "feedback",
            ].map((tab) => (
              <button
                key={tab}
                className={classNames(
                  "text-white hover:text-blue-200 transition text-sm",
                  { "font-bold": activeTab === tab }
                )}
                onClick={() => handleTabChange(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8 px-4">
        {activeTab === "dashboard" && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <img
                  src="/path/to/main-project-image.jpg"
                  alt="Main Project"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Project Details</h3>
                <p>
                  <strong>Name:</strong> {client.projects[0].name}
                </p>
                <p>
                  <strong>Contractor:</strong> {client.projects[0].contractor}
                </p>
                <p>
                  <strong>Working Time:</strong>{" "}
                  {client.projects[0].working_time}
                </p>
                <p>
                  <strong>Project Manager:</strong>{" "}
                  {client.projects[0].project_manager}
                </p>
                <p>
                  <strong>Deadline:</strong> {client.projects[0].deadline}
                </p>
                <p>
                  <strong>Status:</strong> {client.projects[0].status}
                </p>
                <p>
                  <strong>Team Lead:</strong> {client.projects[0].team_lead}
                </p>
                <p>
                  <strong>Budget:</strong> $
                  {client.projects[0].budget.toLocaleString()}
                </p>
                <p>
                  <strong>Description:</strong> {client.projects[0].description}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="space-y-4">
              {client.projects.map((project, index) => (
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
                    <strong>Budget:</strong> ${project.budget.toLocaleString()}
                  </p>
                  <p>
                    <strong>Description:</strong> {project.description}
                  </p>
                </div>
              ))}
            </div>
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
            <h2 className="text-2xl font-bold mb-4">Documents</h2>
            <div className="space-y-4">
              {/* Replace with dynamic document list */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <p>
                  <strong>Document:</strong> Contract.pdf
                </p>
                <button className="text-blue-600 hover:underline">
                  Download
                </button>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p>
                  <strong>Document:</strong> ProjectPlan.pdf
                </p>
                <button className="text-blue-600 hover:underline">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notices" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Notices</h2>
            <div className="space-y-4">
              {/* Replace with dynamic notice list */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold">Notice Title 1</h3>
                <p>This is the description of the first notice.</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold">Notice Title 2</h3>
                <p>This is the description of the second notice.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Feedback
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
                Submit Feedback
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;
