"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateCostCodePage: React.FC = () => {
  const router = useRouter();

  const [costHeaderNumber, setCostHeaderNumber] = useState("");
  const [costHeaderName, setCostHeaderName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");

  const handleSave = () => {
    // Handle the save logic here, such as sending data to an API
    console.log({
      costHeaderNumber,
      costHeaderName,
      description,
      unitPrice,
      quantity,
    });
    router.push("/costcodes");
  };

  const handleDiscard = () => {
    router.push("/costcodes");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Create Cost Code</div>
      <div className="flex justify-end mb-4"></div>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={handleDiscard}
        >
          Discard
        </button>
      </div>
      <div>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Cost Header Number</label>
            <input
              type="text"
              value={costHeaderNumber}
              onChange={(e) => setCostHeaderNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Cost Header Name</label>
            <input
              type="text"
              value={costHeaderName}
              onChange={(e) => setCostHeaderName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Unit Price</label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
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
        </form>
      </div>
    </div>
  );
};

export default CreateCostCodePage;
