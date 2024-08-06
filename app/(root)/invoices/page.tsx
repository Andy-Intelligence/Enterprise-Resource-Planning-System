"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus } from "react-icons/fi";

interface Invoice {
  invoiceCode: string;
  customerName: string;
  invoiceDate: string;
  terms: string;
  dueDate: string;
  customerNotes: string;
}

const InvoicePage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const invoices: Invoice[] = [
    {
      invoiceCode: "INV001",
      customerName: "Thomas",
      invoiceDate: "2024-05-20",
      terms: "Net 30",
      dueDate: "2024-07-20",
      customerNotes: "Thank you for choosing us",
    },
    {
      invoiceCode: "INV002",
      customerName: "Emma",
      invoiceDate: "2024-05-22",
      terms: "Net 15",
      dueDate: "2024-06-06",
      customerNotes: "Please pay on time",
    },
    {
      invoiceCode: "INV003",
      customerName: "Oliver",
      invoiceDate: "2024-05-25",
      terms: "Net 45",
      dueDate: "2024-07-09",
      customerNotes: "We appreciate your business",
    },
    // Add more invoices as needed
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      searchQuery === "" ||
      invoice.invoiceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Invoices</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/invoices/create")}
        >
          <FiPlus /> Create Invoice
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search invoices..."
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
                <th className="py-3 px-4 text-left">Invoice Code</th>
                <th className="py-3 px-4 text-left">Customer Name</th>
                <th className="py-3 px-4 text-left">Invoice Date</th>
                <th className="py-3 px-4 text-left">Terms</th>
                <th className="py-3 px-4 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.invoiceCode}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    router.push(`/invoices/${invoice.invoiceCode}`)
                  }
                >
                  <td className="py-4 px-4 border-b">{invoice.invoiceCode}</td>
                  <td className="py-4 px-4 border-b">{invoice.customerName}</td>
                  <td className="py-4 px-4 border-b">{invoice.invoiceDate}</td>
                  <td className="py-4 px-4 border-b">{invoice.terms}</td>
                  <td className="py-4 px-4 border-b">{invoice.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredInvoices.length} of {invoices.length} invoices
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

export default InvoicePage;
