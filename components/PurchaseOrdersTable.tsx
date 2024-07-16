"use client";
import React from "react";
import InvoiceRowComponent from "./InvoiceRowComponent";
import PurchaseOrderRowComponent from "./PurchaseOrderRowComponent";

interface PurchaseOrder {
  purchaseOrderCode: string;
  vendorName: string;
  purchaseOrderDate: string;
  invoiceAmount: number;
}

interface InvoicesTableProps {
  purchaseOrders: PurchaseOrder[];
}

const PurchaseOrdersTable: React.FC<InvoicesTableProps> = ({ purchaseOrders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">S/N</th>
            <th className="py-2 px-4 border-b">Purchase Order Code</th>
            <th className="py-2 px-4 border-b">Purchase Order Date</th>
            <th className="py-2 px-4 border-b">Invoice Amount</th>
            <th className="py-2 px-4 border-b">Vendor Name </th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((purchaseOrder, index) => (
 
            <PurchaseOrderRowComponent
              key={purchaseOrder.purchaseOrderCode}
              index={index + 1}
              data={purchaseOrder}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrdersTable;
