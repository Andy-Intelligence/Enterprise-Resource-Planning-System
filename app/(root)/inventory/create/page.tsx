

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX, FiFileText, FiDollarSign, FiBook } from "react-icons/fi";

const CreateInventoryItem: React.FC = () => {
  const router = useRouter();

  const [inventoryCode, setInventoryCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [VAT, setVAT] = useState<number | "">("");

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

  const handleSave = () => {
    // Handle the save logic here, such as sending data to an API
    console.log({
      inventoryCode,
      itemName,
      itemType,
      image,
      quantity,
      purchasePrice,
      VAT,
    });
    router.push("/inventory");
  };

  const handleDiscard = () => {
    router.push("/inventory");
  };

  const handleAction = (action: string) => {
    console.log(action);
    // Handle action logic here
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Inventory Item</h1>
        
        <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleSave}
          >
            <FiSave /> Save
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            onClick={handleDiscard}
          >
            <FiX /> Discard
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={() => handleAction("Quotation")}
          >
            <FiFileText /> Quotation
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            onClick={() => handleAction("Invoice")}
          >
            <FiDollarSign /> Invoice
          </button>
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors flex items-center gap-2"
            onClick={() => handleAction("Receipts")}
          >
            <FiBook /> Receipts
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Inventory Code</label>
            <input
              type="text"
              value={inventoryCode}
              onChange={(e) => setInventoryCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Item Type</label>
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Item Type</option>
              {itemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Purchase Price</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">VAT (%)</label>
            <input
              type="number"
              value={VAT}
              onChange={(e) => setVAT(e.target.value === "" ? "" : parseFloat(e.target.value))}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInventoryItem;
