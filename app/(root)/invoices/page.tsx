"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MaterialsTable from "@/components/MaterialsTable";
import InvoicesTable from "@/components/InvoicesTable";

interface Invoice {
  invoiceCode: string;
  customerName: string;
  invoiceDate: string;
  terms: string;
  dueDate: string;
  customerNotes: string;
}

const Invoicepage: React.FC = () => {
  const router = useRouter();

  const invoices: Invoice[] = [
   
    {
 invoiceCode: "INV001",
  customerName: "Thomas",
  invoiceDate: "2024-05-20",
  terms: "string",
  dueDate: "2024-07-20",
  customerNotes: "Thank you for choosing us",
    },
    {
 invoiceCode: "INV001",
  customerName: "Thomas",
  invoiceDate: "2024-05-20",
  terms: "string",
  dueDate: "2024-07-20",
  customerNotes: "Thank you for choosing us",
    },
    // Add more materials as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Invoices</div>
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
          onClick={() => router.push("/invoices/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <InvoicesTable invoices={invoices} />
      </div>
    </div>
  );
};

export default Invoicepage;
