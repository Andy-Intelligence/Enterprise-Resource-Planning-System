"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Inventory {
  inventoryCode: string;
  itemName: string;
  itemType: string;
  image: string;
  quantity: number;
  purchasePrice: number;
  VAT: number;
}

interface CostHeadersTableProps {
  inventorys: Inventory[];
}

const InventorysTable: React.FC<CostHeadersTableProps> = ({ inventorys }) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/cost-header/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 text-start border-b">
              Inventory Code
            </th>
            <th className="py-2 px-4 text-start border-b">Item Name</th>
            <th className="py-2 px-4 text-start border-b">Item Type</th>
            <th className="py-2 px-4 text-start border-b">Image</th>
            <th className="py-2 px-4 text-start border-b">Quantity</th>
            <th className="py-2 px-4 text-start border-b">Purchase Price</th>
            <th className="py-2 px-4 text-start border-b">VAT</th>
          </tr>
        </thead>
        <tbody>
          {inventorys.map((inventory) => (
            <tr
              key={inventory.inventoryCode}
              className="cursor-pointer"
              onClick={() => handleRowClick(inventory.inventoryCode)}
            >
              <td className="py-2 px-4 border-b text-center">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4 border-b">
                {inventory.inventoryCode}
              </td>
              <td className="py-2 px-4 border-b">
                {inventory.itemName}
              </td>
              <td className="py-2 px-4 border-b">{inventory.itemType}</td>
              <td className="py-2 px-4 border-b">{inventory.image}</td>
              <td className="py-2 px-4 border-b">{inventory.quantity}</td>
              <td className="py-2 px-4 border-b">{inventory.purchasePrice}</td>
              <td className="py-2 px-4 border-b">{inventory.VAT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventorysTable;
