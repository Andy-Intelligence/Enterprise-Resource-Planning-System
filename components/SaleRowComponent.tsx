"use client";
import React from "react";

interface Sale {
  salesId: string;
  customerName: string;
  itemName: string;
  quantity: number;
  unit: string;
  totalCost: number;
  paidAmount: number;
}

interface MaterialRowProps {
  index: number;
  data: Sale;
}

const SaleRowComponent: React.FC<MaterialRowProps> = ({ index, data }) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b text-center">
        <input type="checkbox" />
      </td>
      <td className="py-2 px-4 border-b">{index}</td>
      <td className="py-2 px-4 border-b">{data.salesId}</td>
      <td className="py-2 px-4 border-b">{data.customerName}</td>
      <td className="py-2 px-4 border-b">{data.itemName}</td>
      <td className="py-2 px-4 border-b">{data.quantity}</td>
      <td className="py-2 px-4 border-b">{data.unit}</td>
      <td className="py-2 px-4 border-b">{data.totalCost}</td>
      <td className="py-2 px-4 border-b">{data.paidAmount}</td>
    </tr>
  );
};

export default SaleRowComponent;
