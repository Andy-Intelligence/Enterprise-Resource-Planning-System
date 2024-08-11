"use client";

import React from "react";
import {
  FiClock,
  FiCalendar,
  FiUser,
  FiBarChart2,
  FiCheckSquare,
  FiAlertCircle,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";


interface Task {
  title: string;
  project: string;
  stage: string;
  hoursPlanned: number;
  deadline: string;
  assignedTo: string;
  description: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

interface DetailItemProps {
  label: string;
  value: string | number;
}

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  date: string;
}

interface ProgressBarProps {
  label: string;
  value: number;
}

// TaskDetailsDisplay component
const TaskDetailsDisplay: React.FC<{ task: Task }> = ({ task }) => {
  const stageOptions = ["Not Started", "In Progress", "Completed"];

  const getStatusColor = (stage: string) => {
    const stageIndex = stageOptions.indexOf(stage);
    const progress = (stageIndex / (stageOptions.length - 1)) * 100;
    if (progress < 33) return "bg-red-500";
    if (progress < 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">{task.title}</h1>
            <p className="text-blue-100 mb-6">Project: {task.project}</p>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  task.stage
                )}`}
              >
                {task.stage}
              </span>
              <div className="flex items-center space-x-2">
                <FiBarChart2 className="text-blue-200" />
                <span className="font-semibold">Progress: 45%</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Hours Planned"
                value={task.hoursPlanned}
                icon={<FiClock className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Deadline"
                value={task.deadline}
                icon={<FiCalendar className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Assigned To"
                value={task.assignedTo}
                icon={<FiUser className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Task Status"
                value="In Progress"
                icon={<FiCheckSquare className="text-blue-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="details"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                >
                  Task Details
                </TabsTrigger>
                <TabsTrigger
                  value="description"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="progress"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                >
                  Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Task Information
                    </h3>
                    <dl className="space-y-2">
                      <DetailItem label="Project" value={task.project} />
                      <DetailItem label="Assigned To" value={task.assignedTo} />
                      <DetailItem label="Stage" value={task.stage} />
                      <DetailItem
                        label="Hours Planned"
                        value={`${task.hoursPlanned} hours`}
                      />
                      <DetailItem label="Deadline" value={task.deadline} />
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Task Timeline
                    </h3>
                    <div className="space-y-4">
                      <TimelineItem
                        icon={<FiCheckSquare className="text-green-500" />}
                        title="Task Created"
                        date="Aug 10, 2024"
                      />
                      <TimelineItem
                        icon={<FiUser className="text-blue-500" />}
                        title="Assigned to Team"
                        date="Aug 11, 2024"
                      />
                      <TimelineItem
                        icon={<FiAlertCircle className="text-yellow-500" />}
                        title="In Progress"
                        date="Aug 12, 2024"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="description">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Task Description
                  </h3>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {task.description}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="progress">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Task Progress
                  </h3>
                  <div className="space-y-4">
                    <ProgressBar label="Overall Progress" value={45} />
                    <ProgressBar label="Time Spent" value={30} />
                    <ProgressBar label="Budget Used" value={25} />
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

// Subcomponents with their TypeScript types

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
    <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div className="flex items-center">
    <dt className="w-1/3 text-sm font-medium text-gray-600">{label}:</dt>
    <dd className="w-2/3 text-sm text-gray-800">{value}</dd>
  </div>
);

const TimelineItem: React.FC<TimelineItemProps> = ({ icon, title, date }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-white p-2 rounded-full shadow">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  </div>
);

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-blue-600">{value}%</span>
    </div>
    <Progress value={value} className="h-2 bg-blue-600" />
  </div>
);

// Dummy data for testing the component
const dummyTask: Task = {
  title: "Design New Website",
  project: "Corporate Website Redesign",
  stage: "In Progress",
  hoursPlanned: 120,
  deadline: "2024-08-31",
  assignedTo: "Jane Doe",
  description:
    "The task involves designing the new layout for the corporate website, including all necessary pages and assets. The design should be responsive, modern, and in line with the company's brand guidelines.",
};

const App = () => {
  return <TaskDetailsDisplay task={dummyTask} />;
};

export default App;
