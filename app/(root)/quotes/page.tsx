"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MaterialsTable from "@/components/MaterialsTable";
import InvoicesTable from "@/components/InvoicesTable";
import QuotesTable from "@/components/QuotesTable";

interface Quote {
  // quoteCode: string;
  // customerName: string;
  // reference:any;
  // quoteDate: string;
  // terms: string;
  // expiryDate: string;
  // salesPerson:string;
  // ProjectName:string;
  // customerNotes: string;
  // subject:string;
  // attachment:any;
  quoteCode: string;
  customerName: string;
  ProjectName: string;
  quoteDate: string;
  expiryDate: string;
}

const Quotepage: React.FC = () => {
  const router = useRouter();

  const quotes: Quote[] = [
    {
      quoteCode: "QTE001",
      customerName: "Thomas",
      ProjectName: "Blue house",
      quoteDate: "2024-05-20",
      expiryDate: "2024-07-20",
    },
    {
      quoteCode: "QTE002",
      customerName: "Thomas",
      ProjectName: "Blue house",
      quoteDate: "2024-05-20",
      expiryDate: "2024-07-20",
    },
    // Add more materials as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Quotes</div>
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
          onClick={() => router.push("/quotes/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <QuotesTable quotes={quotes} />
      </div>
    </div>
  );
};

export default Quotepage;
