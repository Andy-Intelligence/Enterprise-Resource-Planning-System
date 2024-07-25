"use client";
import React from "react";
import InvoiceRowComponent from "./InvoiceRowComponent";
import QuoteRowComponent from "./QuoteRowComponent";
import SaleRowComponent from "./SaleRowComponent";
import SupplierRowComponent from "./SupplierRowComponent";

interface Supplier {
  supplierId: string;
  supplierName: string;
  address: string;
  phoneNumber: string;
  email: string;
}
interface InvoicesTableProps {
  suppliers: Supplier[];
}

const SuppliersTable: React.FC<InvoicesTableProps> = ({ suppliers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">S/N</th>
            <th className="py-2 px-4 border-b">Sales Id </th>
            <th className="py-2 px-4 border-b">Supplier Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">email </th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <SupplierRowComponent
              key={supplier.supplierId}
              index={index + 1}
              data={supplier}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuppliersTable;
