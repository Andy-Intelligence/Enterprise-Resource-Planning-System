"use client";
import React from "react";
import InvoiceRowComponent from "./InvoiceRowComponent";


interface Invoice {
  invoiceCode: string;
  customerName: string;
  invoiceDate: string;
  terms: string;
  dueDate: string;
  customerNotes: string;
}


interface InvoicesTableProps {
  invoices: Invoice[];
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ invoices }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">S/N</th>
            <th className="py-2 px-4 border-b">Invoice Code</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Invoice Date</th>
            <th className="py-2 px-4 border-b">Due Date </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <InvoiceRowComponent
              key={invoice.invoiceCode}
              index={index + 1}
              data={invoice}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
