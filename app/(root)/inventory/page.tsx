"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CostHeadersTable from "@/components/CostHeadersTable";
import InventorysTable from "@/components/InventorysTable";

interface Inventory {
  inventoryCode: string;
  itemName: string;
  itemType: string;
  image: string;
  quantity: number;
  purchasePrice: number;
  VAT: number;
}

const InventoryPage: React.FC = () => {
  const router = useRouter();

  const inventorys: Inventory[] = [
    {
      inventoryCode: "INV001",
      itemName: "Cement",
      itemType: "Raw Materials",
      image: "string",
      quantity: 4,
      purchasePrice: 4000,
      VAT: 5,
    },
    {
      inventoryCode: "INV002",
      itemName: "Cement",
      itemType: "Raw Materials",
      image: "string",
      quantity: 4,
      purchasePrice: 4000,
      VAT: 5,
    },
    {
      inventoryCode: "INV003",
      itemName: "Cement",
      itemType: "Raw Materials",
      image: "string",
      quantity: 4,
      purchasePrice: 4000,
      VAT: 5,
    },

    // Add more cost header entries as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Inventory</div>
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
          onClick={() => router.push("/inventory/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <InventorysTable inventorys={inventorys} />
      </div>
    </div>
  );
};

export default InventoryPage;
