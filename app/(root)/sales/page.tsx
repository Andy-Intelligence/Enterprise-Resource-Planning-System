"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";

interface Sale {
  salesId: string;
  customerName: string;
  itemName: string;
  quantity: number;
  unit: string;
  totalCost: number;
  paidAmount: number;
  status: string;
}

const SalesPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const sales: Sale[] = [
    {
      salesId: "SA0001",
      customerName: "Jackson",
      itemName: "Spade",
      quantity: 1,
      unit: "kg",
      totalCost: 989,
      paidAmount: 109,
      status: "Pending",
    },
    {
      salesId: "SA0002",
      customerName: "Emma",
      itemName: "Hammer",
      quantity: 2,
      unit: "pcs",
      totalCost: 450,
      paidAmount: 450,
      status: "Completed",
    },
    {
      salesId: "SA0003",
      customerName: "Oliver",
      itemName: "Drill",
      quantity: 1,
      unit: "pcs",
      totalCost: 1200,
      paidAmount: 600,
      status: "Partial",
    },
    // Add more sales as needed
  ];

  const statusOptions = ["Pending", "Partial", "Completed"];

  const filteredSales = sales.filter(
    (sale) =>
      (filterStatus === "" || sale.status === filterStatus) &&
      (searchQuery === "" ||
        sale.salesId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Sales</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/sales/create")}
        >
          <FiPlus /> Create Sale
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search sales..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <FiFilter className="text-gray-400 mr-2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-100 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Sales ID</th>
                <th className="py-3 px-4 text-left">Customer Name</th>
                <th className="py-3 px-4 text-left">Item Name</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Unit</th>
                <th className="py-3 px-4 text-left">Total Cost</th>
                <th className="py-3 px-4 text-left">Paid Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale, index) => (
                <tr
                  key={sale.salesId}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/sales/${sale.salesId}`)}
                >
                  <td className="py-4 px-4 border-b">{sale.salesId}</td>
                  <td className="py-4 px-4 border-b">{sale.customerName}</td>
                  <td className="py-4 px-4 border-b">{sale.itemName}</td>
                  <td className="py-4 px-4 border-b">{sale.quantity}</td>
                  <td className="py-4 px-4 border-b">{sale.unit}</td>
                  <td className="py-4 px-4 border-b">
                    ${sale.totalCost.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 border-b">
                    ${sale.paidAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        sale.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : sale.status === "Partial"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {sale.status}
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
          Showing {filteredSales.length} of {sales.length} sales
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

export default SalesPage;
