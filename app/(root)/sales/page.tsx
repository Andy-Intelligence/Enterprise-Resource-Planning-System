"use client";
import React from "react";
import { useRouter } from "next/navigation";
import QuotesTable from "@/components/QuotesTable";
import SalesTable from "@/components/SalesTable";

interface Sale {
  salesId: string;
  customerName: string;
  itemName: string;
  quantity: number;
  unit: string;
  totalCost: number;
  paidAmount: number;
}

const Quotepage: React.FC = () => {
  const router = useRouter();

  const sales: Sale[] = [
    {
      salesId: "SA0001",
      customerName: "Jackson",
      itemName: "spade",
      quantity: 1,
      unit: "kg",
      totalCost: 989,
      paidAmount: 109,
    },
    {
      salesId: "SA0001",
      customerName: "Jackson",
      itemName: "spade",
      quantity: 1,
      unit: "kg",
      totalCost: 989,
      paidAmount: 109,
    },
    // Add more materials as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Sales</div>
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
          onClick={() => router.push("/sales/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <SalesTable sales={sales} />
      </div>
    </div>
  );
};

export default Quotepage;
