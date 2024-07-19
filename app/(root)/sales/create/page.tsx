"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SaleItem {
  id: string;
  item: string;
  quantity: number;
  unit: string;
  totalCost: number;
  paidAmount: number;
}
const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Sold", value: "sold" }, 

];


const CreateSale: React.FC = () => {
  const router = useRouter();
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formStatus, setFormStatus] = useState("pending");
  const [newSaleItem, setNewSaleItem] = useState<SaleItem>({
    id: "",
    item: "",
    quantity: 0,
    unit: "",
    totalCost: 0,
    paidAmount: 0,
  });
  const [activeTag, setActiveTag] = useState<"pending" | "sold">("pending");

  const handleAddItem = () => {
    setSaleItems([
      ...saleItems,
      { ...newSaleItem, id: (saleItems.length + 1).toString() },
    ]);
    setIsDialogOpen(false);
    setNewSaleItem({
      id: "",
      item: "",
      quantity: 0,
      unit: "",
      totalCost: 0,
      paidAmount: 0,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col justify-between items-start mb-4">
        <div className="text-3xl font-bold mb-4">Sales</div>
        <div className="flex items-center justify-between space-x-2 w-full">
          <div className="flex items-center justify-center space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Save
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Discard
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Draft
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Inventory
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {statusOptions.map((status, index) => (
              <button
                key={status.value}
                className={`px-2 py-1 text-xs rounded-full ${
                  formStatus === status.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                style={{ minWidth: "80px", textAlign: "center" }}
                onClick={() => setFormStatus(status.value)}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Customer</label>
        <input type="text" className="w-full px-4 py-2 border rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Sales Person</label>
        <input type="text" className="w-full px-4 py-2 border rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Shipping Address</label>
        <input type="text" className="w-full px-4 py-2 border rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Date</label>
        <input type="date" className="w-full px-4 py-2 border rounded-md" />
      </div>
      <div className="text-2xl font-bold mb-4">Sale Items</div>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Item</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Unit</th>
              <th className="py-2 px-4 border-b">Total Cost</th>
              <th className="py-2 px-4 border-b">Paid Amount</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {saleItems.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.item}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">{item.unit}</td>
                <td className="py-2 px-4 border-b">{item.totalCost}</td>
                <td className="py-2 px-4 border-b">{item.paidAmount}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() =>
                      setSaleItems(saleItems.filter((_, i) => i !== index))
                    }
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
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
              <label className="block mb-2">Item</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={newSaleItem.item}
                onChange={(e) =>
                  setNewSaleItem({ ...newSaleItem, item: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Quantity</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={newSaleItem.quantity}
                onChange={(e) =>
                  setNewSaleItem({
                    ...newSaleItem,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Unit</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={newSaleItem.unit}
                onChange={(e) =>
                  setNewSaleItem({ ...newSaleItem, unit: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Total Cost</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={newSaleItem.totalCost}
                onChange={(e) =>
                  setNewSaleItem({
                    ...newSaleItem,
                    totalCost: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Paid Amount</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={newSaleItem.paidAmount}
                onChange={(e) =>
                  setNewSaleItem({
                    ...newSaleItem,
                    paidAmount: parseFloat(e.target.value),
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

export default CreateSale;
