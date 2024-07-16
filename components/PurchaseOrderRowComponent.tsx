"use client";
import React from "react";

interface PurchaseOrder {
  purchaseOrderCode: string;
  vendorName: string;
  purchaseOrderDate: string;
  invoiceAmount: number;
}


interface MaterialRowProps {
  index: number;
  data: PurchaseOrder;
}

const PurchaseOrderRowComponent: React.FC<MaterialRowProps> = ({ index, data }) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b text-center">
        <input type="checkbox" />
      </td>
      <td className="py-2 px-4 border-b">{index}</td>
      <td className="py-2 px-4 border-b">{data.purchaseOrderCode}</td>
      <td className="py-2 px-4 border-b">{data.purchaseOrderDate}</td>
      <td className="py-2 px-4 border-b">{data.invoiceAmount}</td>
      <td className="py-2 px-4 border-b">{data.vendorName}</td>
    </tr>
  );
};

export default PurchaseOrderRowComponent;
