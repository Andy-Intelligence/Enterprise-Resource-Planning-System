"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiX,
  FiFileText,
  FiPackage,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

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
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Sale</h1>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
              <FiSave /> Save
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2">
              <FiX /> Discard
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
              <FiFileText /> Draft
            </button>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors flex items-center gap-2">
              <FiPackage /> Inventory
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                className={`px-4 py-2 rounded-md transition-colors ${
                  formStatus === status.value
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setFormStatus(status.value)}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FormField label="Customer" name="customer" />
          <FormField label="Sales Person" name="salesPerson" />
          <FormField label="Shipping Address" name="shippingAddress" />
          <FormField label="Date" name="date" type="date" />
        </form>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sale Items</h2>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Amount
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {saleItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {item.item}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {item.unit}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    ${item.totalCost.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    ${item.paidAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    <button
                      onClick={() =>
                        setSaleItems(saleItems.filter((_, i) => i !== index))
                      }
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <FiPlus /> Add Item
        </button>

        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Add New Item
              </h2>
              <FormField
                label="Item"
                name="item"
                value={newSaleItem.item}
                onChange={(e) =>
                  setNewSaleItem({ ...newSaleItem, item: e.target.value })
                }
              />
              <FormField
                label="Quantity"
                name="quantity"
                type="number"
                value={newSaleItem.quantity}
                onChange={(e) =>
                  setNewSaleItem({
                    ...newSaleItem,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
              <FormField
                label="Unit"
                name="unit"
                value={newSaleItem.unit}
                onChange={(e) =>
                  setNewSaleItem({ ...newSaleItem, unit: e.target.value })
                }
              />
              <FormField
                label="Total Cost"
                name="totalCost"
                type="number"
                value={newSaleItem.totalCost}
                onChange={(e) =>
                  setNewSaleItem({
                    ...newSaleItem,
                    totalCost: parseFloat(e.target.value),
                  })
                }
              />
              <FormField
                label="Paid Amount"
                name="paidAmount"
                type="number"
                value={newSaleItem.paidAmount}
                onChange={(e) =>
                  setNewSaleItem({
                    ...newSaleItem,
                    paidAmount: parseFloat(e.target.value),
                  })
                }
              />
              <div className="flex justify-end mt-6 gap-3">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  onClick={handleAddItem}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default CreateSale;
