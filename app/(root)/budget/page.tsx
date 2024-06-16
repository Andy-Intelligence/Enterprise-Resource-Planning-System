"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BudgetsTable from "@/components/BudgetsTable";

interface Budget {
  id: string;
  budgetName: string;
  startDate: string;
  endDate: string;
  responsible: string;
  status: string;
}

const Budgetpage: React.FC = () => {
  const router = useRouter();

  const budgets: Budget[] = [
    {
      id: "1",
      budgetName: "Marketing Budget",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      responsible: "John Doe",
      status: "Active",
    },
    {
      id: "2",
      budgetName: "Development Budget",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      responsible: "Jane Smith",
      status: "Pending",
    },
    // Add more budget entries as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Budgets</div>
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
          onClick={() => router.push("/budgets/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <BudgetsTable budgets={budgets} />
      </div>
    </div>
  );
};

export default Budgetpage;
