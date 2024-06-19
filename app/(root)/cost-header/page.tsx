"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CostHeadersTable from "@/components/CostHeadersTable";

interface CostHeader {
  id: string;
  costHeaderNumber: string;
  costHeaderName: string;
  costOfHeader: number;
}

const CostHeaderPage: React.FC = () => {
  const router = useRouter();

  const costHeaders: CostHeader[] = [
    {
      id: "1",
      costHeaderNumber: "001",
      costHeaderName: "Marketing",
      costOfHeader: 1000,
    },
    {
      id: "2",
      costHeaderNumber: "002",
      costHeaderName: "Development",
      costOfHeader: 2000,
    },
    // Add more cost header entries as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Cost Headers</div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => router.push("/cost-header/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <CostHeadersTable costHeaders={costHeaders} />
      </div>
    </div>
  );
};

export default CostHeaderPage;
