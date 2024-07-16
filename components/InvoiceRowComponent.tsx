"use client";
import React from "react";

interface Invoice {
  invoiceCode: string;
  customerName: string;
  invoiceDate: string;
  terms: string;
  dueDate: string;
  customerNotes: string;
}


interface MaterialRowProps {
  index: number;
  data: Invoice;
}

const InvoiceRowComponent: React.FC<MaterialRowProps> = ({ index, data }) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b text-center">
        <input type="checkbox" />
      </td>
      <td className="py-2 px-4 border-b">{index}</td>
      <td className="py-2 px-4 border-b">{data.invoiceCode}</td>
      <td className="py-2 px-4 border-b">{data.customerName}</td>
      <td className="py-2 px-4 border-b">{data.invoiceDate}</td>
      <td className="py-2 px-4 border-b">{data.dueDate}</td>

    </tr>
  );
};

export default InvoiceRowComponent;
