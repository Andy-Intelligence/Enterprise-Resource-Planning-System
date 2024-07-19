"use client";
import React from "react";
import InvoiceRowComponent from "./InvoiceRowComponent";
import QuoteRowComponent from "./QuoteRowComponent";
import SaleRowComponent from "./SaleRowComponent";

interface Sale {
  salesId: string;
  customerName: string;
  itemName: string;
  quantity: number;
  unit: string;
  totalCost: number;
  paidAmount: number;
}


interface InvoicesTableProps {
  sales: Sale[];
}

const SalesTable: React.FC<InvoicesTableProps> = ({ sales }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">S/N</th>
            <th className="py-2 px-4 border-b">Sales Id </th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Item Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Unit </th>
            <th className="py-2 px-4 border-b">Total Cost </th>
            <th className="py-2 px-4 border-b">Paid Amount </th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <SaleRowComponent
              key={sale.salesId}
              index={index + 1}
              data={sale}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
