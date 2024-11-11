"use client";

import React from "react";
import {
  FiUser,
  FiCalendar,
  FiPercent,
  FiMessageSquare,
  FiAward,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface AppraisalData {
  employeeName: string;
  employeeId: string;
  appraisalBy: string;
  appraisalScore: number;
  appraisalDate: string;
  comments: string;
  previousScore?: number;
  department?: string;
  position?: string;
}

const dummyAppraisal: AppraisalData = {
  employeeName: "John Doe",
  employeeId: "EMP001",
  appraisalBy: "Manager A",
  appraisalScore: 85,
  appraisalDate: "2024-08-15",
  comments:
    "John has shown excellent progress in project management skills and team leadership. Areas for improvement include technical documentation and time management.",
  previousScore: 78,
  department: "Engineering",
  position: "Senior Software Engineer",
};

const DisplayAppraisalDetails: React.FC = () => {
  const appraisal = dummyAppraisal;

  const InfoCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: "up" | "down" | "neutral";
  }> = ({ title, value, icon, trend }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
      <div className="bg-green-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="flex items-center space-x-2">
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {trend && (
            <span
              className={`text-sm ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">Appraisal Details</h1>
            <p className="text-green-100 mb-6">
              Employee: {appraisal.employeeName} ({appraisal.employeeId})
            </p>
            <div className="flex items-center space-x-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {appraisal.position}
              </span>
              <span className="flex items-center text-green-200">
                <FiCalendar className="mr-2" />
                Appraisal Date: {appraisal.appraisalDate}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <InfoCard
                title="Appraisal Score"
                value={`${appraisal.appraisalScore}%`}
                icon={<FiAward className="text-green-600 text-2xl" />}
                trend={
                  appraisal.appraisalScore > (appraisal.previousScore || 0)
                    ? "up"
                    : "down"
                }
              />
              <InfoCard
                title="Previous Score"
                value={`${appraisal.previousScore || "N/A"}%`}
                icon={<FiPercent className="text-green-600 text-2xl" />}
              />
              <InfoCard
                title="Appraised By"
                value={appraisal.appraisalBy}
                icon={<FiUser className="text-green-600 text-2xl" />}
              />
            </div>

            <div className="bg-green-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Performance Overview
              </h2>
              <Progress value={appraisal.appraisalScore} className="h-4 mb-4" />
              <p className="text-center text-lg font-semibold text-green-600">
                {appraisal.appraisalScore}% Overall Performance
              </p>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Employee Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="comments"
                >
                  Appraisal Comments
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Employee Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Employee Name
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {appraisal.employeeName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Employee ID
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {appraisal.employeeId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Department
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {appraisal.department || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Position
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {appraisal.position || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="comments">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Appraisal Comments
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <FiMessageSquare className="text-green-600 text-xl mb-2" />
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {appraisal.comments}
                    </p>
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

export default DisplayAppraisalDetails;
