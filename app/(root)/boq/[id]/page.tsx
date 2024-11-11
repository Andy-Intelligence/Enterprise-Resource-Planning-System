"use client";

import React from "react";
import {
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiPackage,
  FiTruck,
  FiTool,
  FiClipboard,
  FiPieChart,
} from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface BOQData {
  id: string;
  project: string;
  client: string;
  status: "Draft" | "Confirmed" | "In Progress" | "Completed";
  startDate: string;
  endDate: string;
  estimatedCost: number;
  subcontractCost: number;
  equipmentCost: number;
  materialCost: number;
  labourCost: number;
  progress: number;
  items: {
    id: string;
    key: string;
    employee: string;
    type: string;
    description: string;
    unitOfMeasure: string;
    quantity: number;
    rate: number;
    total: number;
  }[];
}

const dummyBOQ: BOQData = {
  id: "BOQ001",
  project: "Skyline Tower Construction",
  client: "Metropolis Real Estate",
  status: "In Progress",
  startDate: "2023-06-01",
  endDate: "2024-12-31",
  estimatedCost: 75000000,
  subcontractCost: 15000000,
  equipmentCost: 20000000,
  materialCost: 30000000,
  labourCost: 10000000,
  progress: 35,
  items: [
    {
      id: "1",
      key: "FOUND-001",
      employee: "John Doe",
      type: "Foundation",
      description: "Excavation and concrete pouring",
      unitOfMeasure: "m³",
      quantity: 500,
      rate: 15000,
      total: 7500000,
    },
    {
      id: "2",
      key: "STRUCT-001",
      employee: "Jane Smith",
      type: "Structural",
      description: "Steel framework installation",
      unitOfMeasure: "ton",
      quantity: 200,
      rate: 100000,
      total: 20000000,
    },
    // Add more items as needed
  ],
};

const BOQDetailsDisplay: React.FC = () => {
  const boq = dummyBOQ;

  const StatusBadge: React.FC<{ status: BOQData["status"] }> = ({ status }) => {
    const colorClass =
      status === "Draft"
        ? "bg-yellow-100 text-yellow-800"
        : status === "Confirmed"
        ? "bg-green-100 text-green-800"
        : status === "In Progress"
        ? "bg-green-100 text-green-800"
        : "bg-purple-100 text-purple-800";
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
    color: string;
  }> = ({ title, value, icon, color }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-800">
        ₦{value.toLocaleString()}
      </p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-indigo-600 px-8 py-12 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2">{boq.project}</h1>
                <p className="text-green-100 mb-6">Bill of Quantity Details</p>
                <div className="flex items-center space-x-4">
                  <StatusBadge status={boq.status} />
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="text-green-200" />
                    <span className="font-semibold">
                      {boq.startDate} - {boq.endDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold mb-2">Client</p>
                <p className="text-2xl font-bold">{boq.client}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Cost Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <StatCard
                  title="Total Estimated"
                  value={boq.estimatedCost}
                  icon={<TbCurrencyNaira className="text-green-600" />}
                  color="border-green-600"
                />
                <StatCard
                  title="Subcontract"
                  value={boq.subcontractCost}
                  icon={<FiUsers className="text-green-600" />}
                  color="border-green-600"
                />
                <StatCard
                  title="Equipment"
                  value={boq.equipmentCost}
                  icon={<FiTruck className="text-yellow-600" />}
                  color="border-yellow-600"
                />
                <StatCard
                  title="Material"
                  value={boq.materialCost}
                  icon={<FiPackage className="text-red-600" />}
                  color="border-red-600"
                />
                <StatCard
                  title="Labour"
                  value={boq.labourCost}
                  icon={<FiTool className="text-purple-600" />}
                  color="border-purple-600"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Project Progress
              </h2>
              <div className="flex items-center space-x-4">
                <div className="w-2/3">
                  <Progress value={boq.progress} className="h-4" />
                </div>
                <div className="w-1/3 text-center">
                  <span className="text-4xl font-bold text-green-600">
                    {boq.progress}%
                  </span>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="items" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-3 px-6 text-sm font-medium transition-all"
                  value="items"
                >
                  BOQ Items
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-3 px-6 text-sm font-medium transition-all"
                  value="analysis"
                >
                  Cost Analysis
                </TabsTrigger>
              </TabsList>
              <TabsContent value="items">
                <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Key",
                          "Employee",
                          "Type",
                          "Description",
                          "Unit",
                          "Quantity",
                          "Rate (₦)",
                          "Total (₦)",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {boq.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.key}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.employee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.type}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.unitOfMeasure}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.rate.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td
                          colSpan={7}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                        >
                          Total
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₦
                          {boq.items
                            .reduce((sum, item) => sum + item.total, 0)
                            .toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="analysis">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Cost Breakdown
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        Distribution
                      </h4>
                      {/* Add a pie chart or bar chart here to visualize cost distribution */}
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        [Cost Distribution Chart Placeholder]
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        Cost Factors
                      </h4>
                      <ul className="space-y-2">
                        {[
                          { label: "Subcontract", value: boq.subcontractCost },
                          { label: "Equipment", value: boq.equipmentCost },
                          { label: "Material", value: boq.materialCost },
                          { label: "Labour", value: boq.labourCost },
                        ].map((item) => (
                          <li
                            key={item.label}
                            className="flex justify-between items-center"
                          >
                            <span className="text-gray-600">{item.label}</span>
                            <span className="font-medium text-gray-800">
                              ₦{item.value.toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

export default BOQDetailsDisplay;
