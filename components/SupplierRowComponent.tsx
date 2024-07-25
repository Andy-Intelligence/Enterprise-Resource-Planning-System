"use client";
import React from "react";

interface Supplier {
  supplierId: string;
  supplierName: string;
  address: string;
  phoneNumber: string;
  email: string;
}

interface MaterialRowProps {
  index: number;
  data: Supplier;
}

const SupplierRowComponent: React.FC<MaterialRowProps> = ({ index, data }) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b text-center">
        <input type="checkbox" />
      </td>
      <td className="py-2 px-4 border-b">{index}</td>
      <td className="py-2 px-4 border-b">{data.supplierId}</td>
      <td className="py-2 px-4 border-b">{data.supplierName}</td>
      <td className="py-2 px-4 border-b">{data.address}</td>
      <td className="py-2 px-4 border-b">{data.phoneNumber}</td>
      <td className="py-2 px-4 border-b">{data.email}</td>
    </tr>
  );
};

export default SupplierRowComponent;
