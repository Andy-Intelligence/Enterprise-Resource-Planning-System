"use client";

import React from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiUser,
  FiCheckSquare,
  FiMessageSquare,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Define the Issue type
interface Issue {
  id: number;
  title: string;
  project: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
  assignedTo: string;
  deadline: string; // Can be a string or Date if you prefer to use Date objects
  task: string;
  commentsCount?: number;
  description: string;
}

// Component to display issue details
const DisplayIssueDetails: React.FC<{ issue: Issue }> = ({ issue }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-red-500";
      case "in progress":
        return "bg-yellow-500";
      case "resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">{issue.title}</h1>
            <p className="text-pink-100 mb-6">Project: {issue.project}</p>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  issue.status
                )}`}
              >
                {issue.status}
              </span>
              <div className="flex items-center space-x-2">
                <FiAlertCircle className="text-blue-200" />
                <span className="font-semibold">
                  Priority: {issue.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Assigned To"
                value={issue.assignedTo}
                icon={<FiUser className="text-blue-600 text-2xl " />}
              />
              <StatCard
                title="Deadline"
                value={issue.deadline}
                icon={<FiCalendar className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Related Task"
                value={issue.task}
                icon={<FiCheckSquare className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Comments"
                value={issue.commentsCount || 0}
                icon={<FiMessageSquare className="text-blue-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="details"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                >
                  Issue Details
                </TabsTrigger>
                <TabsTrigger
                  value="description"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                >
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Issue Information
                    </h3>
                    <dl className="space-y-2">
                      <DetailItem label="Project" value={issue.project} />
                      <DetailItem label="Related Task" value={issue.task} />
                      <DetailItem
                        label="Assigned To"
                        value={issue.assignedTo}
                      />
                      <DetailItem label="Deadline" value={issue.deadline} />
                      <DetailItem label="Status" value={issue.status} />
                      <DetailItem label="Priority" value={issue.priority} />
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Issue Timeline
                    </h3>
                    <div className="space-y-4">
                      <TimelineItem
                        icon={<FiAlertCircle className="text-red-500" />}
                        title="Issue Reported"
                        date="Aug 10, 2024"
                      />
                      <TimelineItem
                        icon={<FiUser className="text-blue-500" />}
                        title="Assigned to Team"
                        date="Aug 11, 2024"
                      />
                      <TimelineItem
                        icon={<FiMessageSquare className="text-green-500" />}
                        title="First Comment Added"
                        date="Aug 12, 2024"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="description">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Issue Description
                  </h3>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {issue.description}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <ActivityItem
                      user="John Doe"
                      action="commented"
                      date="2 hours ago"
                      content="We should prioritize this issue for the next sprint."
                    />
                    <ActivityItem
                      user="Jane Smith"
                      action="changed status"
                      date="1 day ago"
                      content="Status updated from 'Open' to 'In Progress'"
                    />
                    <ActivityItem
                      user="Mike Johnson"
                      action="assigned"
                      date="2 days ago"
                      content="Assigned to Development Team"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// StatCard Component
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
    <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// DetailItem Component
const DetailItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="flex items-center">
    <dt className="w-1/3 text-sm font-medium text-gray-600">{label}:</dt>
    <dd className="w-2/3 text-sm text-gray-800">{value}</dd>
  </div>
);

// TimelineItem Component
const TimelineItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  date: string;
}> = ({ icon, title, date }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-white p-2 rounded-full shadow">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  </div>
);

// ActivityItem Component
const ActivityItem: React.FC<{
  user: string;
  action: string;
  date: string;
  content: string;
}> = ({ user, action, date, content }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium text-gray-800">{user}</span>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
    <p className="text-sm text-gray-600 mb-1">
      <span className="font-medium">{action}</span> on this issue
    </p>
    <p className="text-sm text-gray-700">{content}</p>
  </div>
);

// Dummy data for the issue
const dummyIssue: Issue = {
  id: 1,
  title: "Fix Login Bug",
  project: "Project Alpha",
  status: "In Progress",
  priority: "High",
  assignedTo: "John Doe",
  deadline: "2024-08-15",
  task: "User Authentication",
  commentsCount: 5,
  description: `
    There is a critical bug in the login feature that prevents users from logging in under certain conditions.
    The issue has been reported multiple times by users, and it needs to be addressed immediately.
    Please make sure to check the related user authentication task and update the status as progress is made.
  `,
};

// Render the component with dummy data
const IssueDetailsPage: React.FC = () => {
  return <DisplayIssueDetails issue={dummyIssue} />;
};

export default IssueDetailsPage;
