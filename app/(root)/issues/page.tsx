"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import IssueCard from "@/components/IssueCard";
import { FiSearch, FiPlus } from "react-icons/fi";

interface Issue {
  id: number;
  status: string;
}

const IssuesComponent = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data representing issues with IDs
  const issues: Issue[] = [
    { id: 1, status: "To Do" },
    { id: 2, status: "In Progress" },
    { id: 3, status: "Completed" },
    { id: 4, status: "Completed" },
    { id: 5, status: "Cancelled" },
    { id: 6, status: "Cancelled" },
  ];

  // Group issues by status
  const groupedIssues = issues.reduce((acc, issue) => {
    acc[issue.status] = [...(acc[issue.status] || []), issue];
    return acc;
  }, {} as Record<string, Issue[]>);

  const statusColors = {
    "To Do": "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Issues</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/issues/create")}
        >
          <FiPlus /> Create Issue
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search issues..."
            className="bg-transparent w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(groupedIssues).map(([status, issues]) => (
            <div key={status} className="flex flex-col gap-y-4">
              <h2
                className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${
                  statusColors[status as keyof typeof statusColors]
                }`}
              >
                {status}
              </h2>
              {issues.map((issue) => (
                <Link key={issue.id} href={`/issues/${issue.id}`}>
                  <IssueCard />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50">
            1
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default IssuesComponent;
