"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Budget {
  id: string;
  budgetName: string;
  startDate: string;
  endDate: string;
  responsible: string;
  status: string;
}

interface BudgetTableProps {
  budgets: Budget[];
}

const BudgetsTable: React.FC<BudgetTableProps> = ({ budgets }) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/budget/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="w-full">
          <tr className="w-full">
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 text-start border-b">Budget Name</th>
            <th className="py-2 px-4 text-start border-b">Start Date</th>
            <th className="py-2 px-4 text-start border-b">End Date</th>
            <th className="py-2 px-4 text-start border-b">Responsible</th>
            <th className="py-2 px-4 text-start border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr
              key={budget.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(budget.id)}
            >
              <td className="py-2 px-4 border-b text-center">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4 border-b">{budget.budgetName}</td>
              <td className="py-2 px-4 border-b">{budget.startDate}</td>
              <td className="py-2 px-4 border-b">{budget.endDate}</td>
              <td className="py-2 px-4 border-b">{budget.responsible}</td>
              <td className="py-2 px-4 border-b">{budget.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetsTable;
