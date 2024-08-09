"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BOQCard from "@/components/BOQCard";
import { FiSearch, FiPlus } from "react-icons/fi";

interface BOQ {
  id: number;
  project: string;
  status: string;
  estimatedCost: number;
}

const BOQsComponent = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data representing BOQs
  const boqs: BOQ[] = [
    { id: 1, project: "Project A", status: "Draft", estimatedCost: 50000 },
    { id: 2, project: "Project B", status: "Confirmed", estimatedCost: 75000 },
    { id: 3, project: "Project C", status: "Draft", estimatedCost: 60000 },
    { id: 4, project: "Project D", status: "Confirmed", estimatedCost: 90000 },
    { id: 5, project: "Project E", status: "Draft", estimatedCost: 45000 },
    { id: 6, project: "Project F", status: "Confirmed", estimatedCost: 80000 },
  ];

  // Group BOQs by status
  const groupedBOQs = boqs.reduce((acc, boq) => {
    acc[boq.status] = [...(acc[boq.status] || []), boq];
    return acc;
  }, {} as Record<string, BOQ[]>);

  const statusColors = {
    Draft: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-green-100 text-green-800",
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Bills of Quantity</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/boq/create")}
        >
          <FiPlus /> Create BOQ
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search BOQs..."
            className="bg-transparent w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedBOQs).map(([status, boqs]) => (
            <div key={status} className="flex flex-col gap-y-4">
              <h2
                className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${
                  statusColors[status as keyof typeof statusColors]
                }`}
              >
                {status}
              </h2>
              {boqs.map((boq) => (
                <Link key={boq.id} href={`/boq/${boq.id}`}>
                  <BOQCard boq={boq} />
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

export default BOQsComponent;
