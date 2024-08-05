"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX, FiPlus } from "react-icons/fi";

interface ItemDetail {
  id: string;
  item: string;
  quantity: number;
  unit: string;
  status: string;
}

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Ordered", value: "ordered" },
  { label: "Delivered", value: "delivered" },
];

const CreatePurchaseOrder: React.FC = () => {
  const router = useRouter();
  const [purchaseItems, setPurchaseItems] = useState<ItemDetail[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItemDetail, setNewItemDetail] = useState<ItemDetail>({
    id: "",
    item: "",
    quantity: 0,
    unit: "",
    status: "pending",
  });

  const handleAddItem = () => {
    setPurchaseItems([
      ...purchaseItems,
      { ...newItemDetail, id: (purchaseItems.length + 1).toString() },
    ]);
    setIsDialogOpen(false);
    setNewItemDetail({
      id: "",
      item: "",
      quantity: 0,
      unit: "",
      status: "pending",
    });
  };

  const handleSave = () => {
    console.log("Purchase Order saved:", purchaseItems);
    // Add save logic here
    router.push("/purchase-orders");
  };

  const handleDiscard = () => {
    router.push("/purchase-orders");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Purchase Order
        </h1>

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
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FormField label="Supplier Name" name="supplierName" />
          <FormField label="Payment Terms" name="paymentTerms" />
          <FormField label="Requisition ID" name="requisitionId" />
          <FormField label="Delivery Address" name="deliveryAddress" />
          <FormField label="Shipping Method" name="shippingMethod" />
          <FormField label="Date" name="date" type="date" />
          <FormField label="Approved By" name="approvedBy" />
        </form>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Item Details</h2>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Item</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Unit</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {purchaseItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4 border-b">{item.item}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">{item.unit}</td>
                  <td className="py-2 px-4 border-b">{item.status}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() =>
                        setPurchaseItems(
                          purchaseItems.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500 hover:text-red-700 transition-colors"
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
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
                value={newItemDetail.item}
                onChange={(e) =>
                  setNewItemDetail({ ...newItemDetail, item: e.target.value })
                }
              />
              <FormField
                label="Quantity"
                name="quantity"
                type="number"
                value={newItemDetail.quantity}
                onChange={(e) =>
                  setNewItemDetail({
                    ...newItemDetail,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
              <FormField
                label="Unit"
                name="unit"
                value={newItemDetail.unit}
                onChange={(e) =>
                  setNewItemDetail({ ...newItemDetail, unit: e.target.value })
                }
              />
              <FormField
                label="Status"
                name="status"
                value={newItemDetail.status}
                onChange={(e) =>
                  setNewItemDetail({ ...newItemDetail, status: e.target.value })
                }
                options={statusOptions}
              />
              <div className="flex justify-end mt-6 gap-3">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  options?: { value: string; label: string }[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  options,
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    {options ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);

export default CreatePurchaseOrder;
