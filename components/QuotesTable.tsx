"use client";
import React from "react";
import InvoiceRowComponent from "./InvoiceRowComponent";
import QuoteRowComponent from "./QuoteRowComponent";

interface Quote {
  quoteCode: string;
  customerName: string;
  ProjectName: string;
  quoteDate: string;
  expiryDate: string;
}

interface InvoicesTableProps {
  quotes: Quote[];
}

const QuotesTable: React.FC<InvoicesTableProps> = ({ quotes }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">S/N</th>
            <th className="py-2 px-4 border-b">Quote Code</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Project Name</th>
            <th className="py-2 px-4 border-b">Quote Date</th>
            <th className="py-2 px-4 border-b">Expiry Date </th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <QuoteRowComponent
              key={quote.quoteCode}
              index={index + 1}
              data={quote}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotesTable;
