"use client";

import React, { useState } from "react";
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

interface InventorysTableProps {
  inventorys: Inventory[];
}

const InventorysTable: React.FC<InventorysTableProps> = ({ inventorys }) => {
  const router = useRouter();
  const [filterType, setFilterType] = useState("");

  const handleRowClick = (id: string) => {
    router.push(`/cost-header/${id}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  const filteredInventorys = inventorys.filter(
    (inventory) => filterType === "" || inventory.itemType === filterType
  );

  const itemTypes = [
    "Raw Materials",
    "Finished Goods",
    "Semi-Finished Goods",
    "Consumables",
    "Structural Materials",
    "Finishing Materials",
    "Mechanical, Electrical, and Plumbing (MEP)",
    "Support Materials",
    "Protective Materials",
    "Foundation Materials",
    "Superstructure Materials",
    "Interior Materials",
    "Exterior Materials",
    "Miscellaneous",
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Filter by Item Type</label>
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">All Types</option>
          {itemTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Select</th>
              <th className="py-2 px-4 text-start border-b">Inventory Code</th>
              <th className="py-2 px-4 text-start border-b">Item Name</th>
              <th className="py-2 px-4 text-start border-b">Item Type</th>
              <th className="py-2 px-4 text-start border-b">Image</th>
              <th className="py-2 px-4 text-start border-b">Quantity</th>
              <th className="py-2 px-4 text-start border-b">Purchase Price</th>
              <th className="py-2 px-4 text-start border-b">VAT</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventorys.map((inventory) => (
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
                <td className="py-2 px-4 border-b">{inventory.itemName}</td>
                <td className="py-2 px-4 border-b">{inventory.itemType}</td>
                <td className="py-2 px-4 border-b">{inventory.image}</td>
                <td className="py-2 px-4 border-b">{inventory.quantity}</td>
                <td className="py-2 px-4 border-b">
                  {inventory.purchasePrice}
                </td>
                <td className="py-2 px-4 border-b">{inventory.VAT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventorysTable;
