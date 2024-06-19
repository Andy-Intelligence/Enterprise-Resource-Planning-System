"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface CostHeader {
  id: string;
  costHeaderNumber: string;
  costHeaderName: string;
  costOfHeader: number;
}

interface CostHeadersTableProps {
  costHeaders: CostHeader[];
}

const CostHeadersTable: React.FC<CostHeadersTableProps> = ({ costHeaders }) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/cost-header/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 text-start border-b">
              Cost Header Number
            </th>
            <th className="py-2 px-4 text-start border-b">Cost Header Name</th>
            <th className="py-2 px-4 text-start border-b">Cost of Header</th>
          </tr>
        </thead>
        <tbody>
          {costHeaders.map((costHeader) => (
            <tr
              key={costHeader.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(costHeader.id)}
            >
              <td className="py-2 px-4 border-b text-center">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4 border-b">
                {costHeader.costHeaderNumber}
              </td>
              <td className="py-2 px-4 border-b">
                {costHeader.costHeaderName}
              </td>
              <td className="py-2 px-4 border-b">{costHeader.costOfHeader}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostHeadersTable;
