"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus } from "react-icons/fi";

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

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
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
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left border-b">
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-4 text-left border-b">S/N</th>
                <th className="py-3 px-4 text-left border-b">Reference</th>
                <th className="py-3 px-4 text-left border-b">Order Date</th>
                <th className="py-3 px-4 text-left border-b">Vendor</th>
                <th className="py-3 px-4 text-left border-b">Scheduled Date</th>
                <th className="py-3 px-4 text-left border-b">
                  Source Document
                </th>
                <th className="py-3 px-4 text-left border-b">Untaxed</th>
                <th className="py-3 px-4 text-left border-b">Total</th>
                <th className="py-3 px-4 text-left border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.map((quotation, index) => (
                <tr
                  key={quotation.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    router.push(`/request-quotation/${quotation.id}`)
                  }
                >
                  <td className="py-4 px-4 border-b">
                    <input type="checkbox" />
                  </td>
                  <td className="py-4 px-4 border-b">{index + 1}</td>
                  <td className="py-4 px-4 border-b">{quotation.reference}</td>
                  <td className="py-4 px-4 border-b">{quotation.orderDate}</td>
                  <td className="py-4 px-4 border-b">{quotation.vendor}</td>
                  <td className="py-4 px-4 border-b">
                    {quotation.scheduledDate}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {quotation.sourceDocument}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {quotation.untaxed.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {quotation.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
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
              <tr>
                <td
                  colSpan={7}
                  className="py-4 px-4 border-t text-right font-bold"
                >
                  Total
                </td>
                <td className="py-4 px-4 border-t">
                  {totalUntaxed.toFixed(2)}
                </td>
                <td className="py-4 px-4 border-t">
                  {totalOverall.toFixed(2)}
                </td>
                <td className="py-4 px-4 border-t"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredQuotations.length} of {quotationData.length}{" "}
          quotations
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

export default RequestQuotationPage;
