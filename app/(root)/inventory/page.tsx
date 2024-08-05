"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

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
    // Add more inventory entries as needed
  ];

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

  const filteredInventory = inventorys.filter(
    (inventory) =>
      (filterType === "" || inventory.itemType === filterType) &&
      (searchQuery === "" ||
        inventory.inventoryCode
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        inventory.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/inventory/create")}
        >
          <FiPlus /> Create Item
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <FiFilter className="text-gray-400 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-100 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">All Types</option>
              {itemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Inventory Code</th>
                <th className="py-3 px-4 text-left">Item Name</th>
                <th className="py-3 px-4 text-left">Item Type</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Purchase Price</th>
                <th className="py-3 px-4 text-left">VAT</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((inventory) => (
                <tr
                  key={inventory.inventoryCode}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    router.push(`/inventory/${inventory.inventoryCode}`)
                  }
                >
                  <td className="py-4 px-4 border-b">
                    {inventory.inventoryCode}
                  </td>
                  <td className="py-4 px-4 border-b">{inventory.itemName}</td>
                  <td className="py-4 px-4 border-b">{inventory.itemType}</td>
                  <td className="py-4 px-4 border-b">{inventory.quantity}</td>
                  <td className="py-4 px-4 border-b">
                    ${inventory.purchasePrice.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 border-b">{inventory.VAT}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredInventory.length} of {inventorys.length} items
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
