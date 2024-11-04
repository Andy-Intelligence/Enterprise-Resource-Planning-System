"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus } from "react-icons/fi";

interface Quote {
  quoteCode: string;
  customerName: string;
  projectName: string;
  quoteDate: string;
  expiryDate: string;
}

const QuotePage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const quotes: Quote[] = [
    {
      quoteCode: "QTE001",
      customerName: "Thomas",
      projectName: "Blue house",
      quoteDate: "2024-05-20",
      expiryDate: "2024-07-20",
    },
    {
      quoteCode: "QTE002",
      customerName: "Emma",
      projectName: "Green office",
      quoteDate: "2024-05-22",
      expiryDate: "2024-07-22",
    },
    {
      quoteCode: "QTE003",
      customerName: "Oliver",
      projectName: "Red barn",
      quoteDate: "2024-05-25",
      expiryDate: "2024-07-25",
    },
    // Add more quotes as needed
  ];

  const filteredQuotes = quotes.filter(
    (quote) =>
      searchQuery === "" ||
      quote.quoteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quotes</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/quotes/create")}
        >
          <FiPlus /> Create Quote
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search quotes..."
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
                <th className="py-3 px-4 text-left">Quote Code</th>
                <th className="py-3 px-4 text-left">Customer Name</th>
                <th className="py-3 px-4 text-left">Project Name</th>
                <th className="py-3 px-4 text-left">Quote Date</th>
                <th className="py-3 px-4 text-left">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote, index) => (
                <tr
                  key={quote.quoteCode}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/quotes/${quote.quoteCode}`)}
                >
                  <td className="py-4 px-4 border-b">{quote.quoteCode}</td>
                  <td className="py-4 px-4 border-b">{quote.customerName}</td>
                  <td className="py-4 px-4 border-b">{quote.projectName}</td>
                  <td className="py-4 px-4 border-b">{quote.quoteDate}</td>
                  <td className="py-4 px-4 border-b">{quote.expiryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredQuotes.length} of {quotes.length} quotes
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-green-600 text-white"
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

export default QuotePage;
