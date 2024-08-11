"use client";

import React from "react";
import {
  FiPackage,
  FiUser,
  FiCalendar,
  FiClock,
  FiFileText,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { TbBuildingFactory2 } from "react-icons/tb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface MaterialRequisitionData {
  id: string;
  requestedBy: string;
  description: string;
  task: string;
  project: string;
  scheduledDate: string;
  status: "Draft" | "Pending" | "Approved" | "Rejected";
  progress: number;
  items: {
    product: string;
    quantity: number;
    status: string;
  }[];
}

const dummyRequisition: MaterialRequisitionData = {
  id: "MR-2024-001",
  requestedBy: "John Doe",
  description: "Materials for the new office building construction",
  task: "Foundation work",
  project: "Skyline Tower Construction",
  scheduledDate: "2024-09-01",
  status: "Pending",
  progress: 65,
  items: [
    { product: "Cement", quantity: 500, status: "Approved" },
    { product: "Steel Bars", quantity: 1000, status: "Pending" },
    { product: "Gravel", quantity: 200, status: "Approved" },
  ],
};

const MaterialRequisitionDisplay: React.FC = () => {
  const requisition = dummyRequisition;

  const StatusBadge: React.FC<{
    status: MaterialRequisitionData["status"];
  }> = ({ status }) => {
    const colorClass =
      status === "Approved"
        ? "bg-green-100 text-green-800"
        : status === "Pending"
        ? "bg-yellow-100 text-yellow-800"
        : status === "Rejected"
        ? "bg-red-100 text-red-800"
        : "bg-gray-100 text-gray-800";
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}
      >
        {status}
      </span>
    );
  };

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

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">
              Material Requisition: {requisition.id}
            </h1>
            <p className="text-blue-100 mb-6">{requisition.description}</p>
            <div className="flex items-center space-x-4">
              <StatusBadge status={requisition.status} />
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-blue-200" />
                <span className="font-semibold">
                  Scheduled: {requisition.scheduledDate}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Requested By"
                value={requisition.requestedBy}
                icon={<FiUser className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Project"
                value={requisition.project}
                icon={<TbBuildingFactory2 className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Task"
                value={requisition.task}
                icon={<FiFileText className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Items"
                value={requisition.items.length}
                icon={<FiPackage className="text-blue-600 text-2xl" />}
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Requisition Progress
              </h2>
              <Progress value={requisition.progress} className="h-4 mb-4" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Draft</span>
                <span>Pending</span>
                <span>Approved</span>
                <span>Completed</span>
              </div>
            </div>

            <Tabs defaultValue="items" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="items"
                >
                  Requested Items
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Requisition Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="actions"
                >
                  Actions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="items">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {requisition.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm text-gray-900">
                            {item.product}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Requisition Information
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Requisition ID:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {requisition.id}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Requested By:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {requisition.requestedBy}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Project:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {requisition.project}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Task:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {requisition.task}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Timeline
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <FiClock className="text-blue-500 mr-2" />
                        <span>Created on August 15, 2024</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiCheckCircle className="text-green-500 mr-2" />
                        <span>Approved by Manager on August 18, 2024</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiAlertTriangle className="text-yellow-500 mr-2" />
                        <span>Pending final approval</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="actions">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Available Actions
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      Edit Requisition
                    </Button>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      Approve
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">
                      Reject
                    </Button>
                    <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                      Generate Report
                    </Button>
                  </div>
                  <div className="mt-8">
                    <h4 className="text-md font-semibold text-gray-700 mb-2">
                      Add Comment
                    </h4>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      rows={4}
                      placeholder="Enter your comment here..."
                    ></textarea>
                    <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white">
                      Submit Comment
                    </Button>
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

export default MaterialRequisitionDisplay;
