"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CostCodesTable from "@/components/CostCodesTable";

interface CostCode {
  id: string;
  costHeaderNumber: string;
  costHeaderName: string;
  description: string;
  unitPrice: number;
  quantity: number;
}

const CostCodePage: React.FC = () => {
  const router = useRouter();

  const costCodes: CostCode[] = [
    {
      id: "1",
      costHeaderNumber: "001",
      costHeaderName: "Marketing",
      description: "Marketing expenses",
      unitPrice: 100,
      quantity: 10,
    },
    {
      id: "2",
      costHeaderNumber: "002",
      costHeaderName: "Development",
      description: "Development expenses",
      unitPrice: 200,
      quantity: 5,
    },
    // Add more cost code entries as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Cost Codes</div>
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
          onClick={() => router.push("/cost-code/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <CostCodesTable costCodes={costCodes} />
      </div>
    </div>
  );
};

export default CostCodePage;
