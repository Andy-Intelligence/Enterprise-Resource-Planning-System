"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

interface RequestQuotation {
  id: number;
  reference: string;
  orderDate: string;
  vendor: string;
  scheduledDate: string;
  sourceDocument: string;
  untaxed: number;
  total: number;
  status: string;
}

const RequestQuotationPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const quotationData: RequestQuotation[] = [
    {
      id: 1,
      reference: "REF123",
      orderDate: "2024-05-18",
      vendor: "Vendor A",
      scheduledDate: "2024-05-20",
      sourceDocument: "DOC123",
      untaxed: 1000.0,
      total: 1200.0,
      status: "RFQ",
    },
    {
      id: 2,
      reference: "REF456",
      orderDate: "2024-05-19",
      vendor: "Vendor B",
      scheduledDate: "2024-05-21",
      sourceDocument: "DOC456",
      untaxed: 2000.0,
      total: 2400.0,
      status: "RFQ",
    },
    // Add more rows as needed
  ];

  const filteredQuotations = quotationData.filter(
    (quotation) =>
      searchQuery === "" ||
      quotation.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUntaxed = filteredQuotations.reduce(
    (acc, item) => acc + item.untaxed,
    0
  );
  const totalOverall = filteredQuotations.reduce(
    (acc, item) => acc + item.total,
    0
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Request Quotation</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/request-quotation/create")}
        >
          <FiPlus /> Create Quotation
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search quotations..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded text-blue-600" />
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S/N
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source Document
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Untaxed
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations.map((quotation, index) => (
                <tr
                  key={quotation.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    router.push(`/request-quotation/${quotation.id}`)
                  }
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded text-blue-600" />
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">{index + 1}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {quotation.reference}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {quotation.orderDate}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {quotation.vendor}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {quotation.scheduledDate}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {quotation.sourceDocument}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {quotation.untaxed.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {quotation.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        quotation.status === "RFQ"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {quotation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={7} className="py-4 px-4 text-right font-bold">
                  Total
                </td>
                <td className="py-4 px-4 font-bold">
                  {totalUntaxed.toFixed(2)}
                </td>
                <td className="py-4 px-4 font-bold">
                  {totalOverall.toFixed(2)}
                </td>
                <td className="py-4 px-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{filteredQuotations.length}</span> of{" "}
          <span className="font-medium">{quotationData.length}</span> quotations
        </div>
        <div className="flex-1 flex justify-end">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <FiChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RequestQuotationPage;
