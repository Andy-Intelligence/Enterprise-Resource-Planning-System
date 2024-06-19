"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CostCode {
  id: string;
  costHeaderNumber: string;
  costHeaderName: string;
  description: string;
  unitPrice: number;
  quantity: number;
}

const CreateCostHeader: React.FC = () => {
  const router = useRouter();
  const [costCodes, setCostCodes] = useState<CostCode[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCostCode, setNewCostCode] = useState<CostCode>({
    id: "",
    costHeaderNumber: "",
    costHeaderName: "",
    description: "",
    unitPrice: 0,
    quantity: 0,
  });

  const handleAddItem = () => {
    setCostCodes([
      ...costCodes,
      { ...newCostCode, id: (costCodes.length + 1).toString() },
    ]);
    setIsDialogOpen(false);
    setNewCostCode({
      id: "",
      costHeaderNumber: "",
      costHeaderName: "",
      description: "",
      unitPrice: 0,
      quantity: 0,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Create Cost Header</div>
      <div className="mb-4">
        <label className="block mb-2">Cost Header Number</label>
        <input type="text" className="w-full px-4 py-2 border rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Cost Header Name</label>
        <input type="text" className="w-full px-4 py-2 border rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Cost of Header</label>
        <input type="number" className="w-full px-4 py-2 border rounded-md" />
      </div>

      <div className="text-2xl font-bold mb-4">Cost Codes</div>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Cost Header Number</th>
              <th className="py-2 px-4 border-b">Cost Header Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Unit Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {costCodes.map((costCode) => (
              <tr key={costCode.id}>
                <td className="py-2 px-4 border-b">
                  {costCode.costHeaderNumber}
                </td>
                <td className="py-2 px-4 border-b">
                  {costCode.costHeaderName}
                </td>
                <td className="py-2 px-4 border-b">{costCode.description}</td>
                <td className="py-2 px-4 border-b">{costCode.unitPrice}</td>
                <td className="py-2 px-4 border-b">{costCode.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={() => setIsDialogOpen(true)}
      >
        Add Item
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-md">
            <div className="mb-4">
              <label className="block mb-2">Cost Header Number</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={newCostCode.costHeaderNumber}
                onChange={(e) =>
                  setNewCostCode({
                    ...newCostCode,
                    costHeaderNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Cost Header Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={newCostCode.costHeaderName}
                onChange={(e) =>
                  setNewCostCode({
                    ...newCostCode,
                    costHeaderName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={newCostCode.description}
                onChange={(e) =>
                  setNewCostCode({
                    ...newCostCode,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Unit Price</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={newCostCode.unitPrice}
                onChange={(e) =>
                  setNewCostCode({
                    ...newCostCode,
                    unitPrice: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Quantity</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={newCostCode.quantity}
                onChange={(e) =>
                  setNewCostCode({
                    ...newCostCode,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleAddItem}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCostHeader;
