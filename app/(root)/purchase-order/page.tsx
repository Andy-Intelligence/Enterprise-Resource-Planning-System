"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MaterialsTable from "@/components/MaterialsTable";
import InvoicesTable from "@/components/InvoicesTable";
import PurchaseOrdersTable from "@/components/PurchaseOrdersTable";

interface PurchaseOrder {
  purchaseOrderCode: string;
  vendorName: string;
  purchaseOrderDate: string;
  invoiceAmount: number;
}

const PurchaseOrderpage: React.FC = () => {
  const router = useRouter();

  const purchaseOrders: PurchaseOrder[] = [
    {
      purchaseOrderCode: "PO/2022/00005",
      purchaseOrderDate: "2022-05-11",
      vendorName: "Apico",
      invoiceAmount: 333.04,
    },
    {
      purchaseOrderCode: "PO/2022/00005",
      purchaseOrderDate: "2022-05-11",
      vendorName: "Marina",
      invoiceAmount: 733.04,
    },
    // Add more materials as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Purchase Order</div>
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
          onClick={() => router.push("/purchase-order/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <PurchaseOrdersTable purchaseOrders={purchaseOrders} />
      </div>
    </div>
  );
};

export default PurchaseOrderpage;
