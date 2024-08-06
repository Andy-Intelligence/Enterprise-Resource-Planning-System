"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus } from "react-icons/fi";

interface MaterialRequisition {
  id: number;
  reference: string;
  destination: string;
  partner: string;
  scheduledDate: string;
  sourceDocument: string;
  backOrderOf: string;
  status: string;
}

const MaterialRequisitionPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const requisitionData: MaterialRequisition[] = [
    {
      id: 1,
      reference: "REF123",
      destination: "Zone 1",
      partner: "Partner A",
      scheduledDate: "2024-05-20",
      sourceDocument: "DOC123",
      backOrderOf: "BO123",
      status: "Pending",
    },
    {
      id: 2,
      reference: "REF456",
      destination: "Zone 2",
      partner: "Partner B",
      scheduledDate: "2024-05-21",
      sourceDocument: "DOC456",
      backOrderOf: "BO456",
      status: "Completed",
    },
    // Add more rows as needed
  ];

  const filteredRequisitions = requisitionData.filter(
    (requisition) =>
      searchQuery === "" ||
      requisition.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      requisition.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      requisition.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Material Requisition
        </h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/material-requisition/create")}
        >
          <FiPlus /> Create Requisition
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search requisitions..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Reference</th>
                <th className="py-3 px-4 text-left">
                  Destination Location Zone
                </th>
                <th className="py-3 px-4 text-left">Partner</th>
                <th className="py-3 px-4 text-left">Scheduled Date</th>
                <th className="py-3 px-4 text-left">Source Document</th>
                <th className="py-3 px-4 text-left">Back Order Of</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequisitions.map((requisition) => (
                <tr
                  key={requisition.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    router.push(`/material-requisition/${requisition.id}`)
                  }
                >
                  <td className="py-4 px-4 border-b">
                    {requisition.reference}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {requisition.destination}
                  </td>
                  <td className="py-4 px-4 border-b">{requisition.partner}</td>
                  <td className="py-4 px-4 border-b">
                    {requisition.scheduledDate}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {requisition.sourceDocument}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {requisition.backOrderOf}
                  </td>
                  <td className="py-4 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        requisition.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {requisition.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredRequisitions.length} of {requisitionData.length}{" "}
          requisitions
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialRequisitionPage;
