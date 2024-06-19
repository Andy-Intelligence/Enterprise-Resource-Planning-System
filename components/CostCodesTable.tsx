"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface CostCode {
  id: string;
  costHeaderNumber: string;
  costHeaderName: string;
  description: string;
  unitPrice: number;
  quantity: number;
}

interface CostCodesTableProps {
  costCodes: CostCode[];
}

const CostCodesTable: React.FC<CostCodesTableProps> = ({ costCodes }) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/costcode/${id}`);
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
            <th className="py-2 px-4 text-start border-b">Description</th>
            <th className="py-2 px-4 text-start border-b">Unit Price</th>
            <th className="py-2 px-4 text-start border-b">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {costCodes.map((costCode) => (
            <tr
              key={costCode.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(costCode.id)}
            >
              <td className="py-2 px-4 border-b text-center">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4 border-b">
                {costCode.costHeaderNumber}
              </td>
              <td className="py-2 px-4 border-b">{costCode.costHeaderName}</td>
              <td className="py-2 px-4 border-b">{costCode.description}</td>
              <td className="py-2 px-4 border-b">{costCode.unitPrice}</td>
              <td className="py-2 px-4 border-b">{costCode.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostCodesTable;
