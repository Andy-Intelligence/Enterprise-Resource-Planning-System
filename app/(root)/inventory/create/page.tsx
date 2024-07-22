






"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleQuotation = () => {
    // Handle quotation logic here
    console.log("Quotation");
  };

  const handleInvoice = () => {
    // Handle invoice logic here
    console.log("Invoice");
  };

  const handleReceipts = () => {
    // Handle receipts logic here
    console.log("Receipts");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Create Inventory Item</div>
      <div className="flex items-center justify-start space-x-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleDiscard}
        >
          Discard
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleQuotation}
        >
          Quotation
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleInvoice}
        >
          Invoice
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleReceipts}
        >
          Receipts
        </button>
      </div>
      <div>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Inventory Code</label>
            <input
              type="text"
              value={inventoryCode}
              onChange={(e) => setInventoryCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Item Type</label>
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
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
            <label className="block text-gray-700">Image</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Purchase Price</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">VAT</label>
            <input
              type="number"
              value={VAT}
              onChange={(e) => setVAT(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInventoryItem;
