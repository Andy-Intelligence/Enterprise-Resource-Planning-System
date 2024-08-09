"use client";

import React, { useState } from "react";
import { FiSave, FiX, FiFileText, FiPlus, FiTrash2 } from "react-icons/fi";

interface BOQItem {
  id: string;
  key: string;
  employee: string;
  type: string;
  description: string;
  unitOfMeasure: string;
  quantity: number;
  rate: number;
  total: number;
}

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Confirmed", value: "confirmed" },
];

const BillOfQuantity: React.FC = () => {
  const [formStatus, setFormStatus] = useState<string>("draft");
  const [boqItems, setBoqItems] = useState<BOQItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<BOQItem>({
    id: "",
    key: "",
    employee: "",
    type: "",
    description: "",
    unitOfMeasure: "",
    quantity: 0,
    rate: 0,
    total: 0,
  });
  const [projectDetails, setProjectDetails] = useState({
    project: "",
    subcontractCost: 0,
    equipmentCost: 0,
    materialCost: 0,
    labourCost: 0,
  });

  const handleAddItem = () => {
    const total = newItem.quantity * newItem.rate;
    setBoqItems([
      ...boqItems,
      { ...newItem, id: (boqItems.length + 1).toString(), total },
    ]);
    setIsDialogOpen(false);
    setNewItem({
      id: "",
      key: "",
      employee: "",
      type: "",
      description: "",
      unitOfMeasure: "",
      quantity: 0,
      rate: 0,
      total: 0,
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewItem({ ...newItem, [field]: value });
  };

  const handleProjectDetailsChange = (field: string, value: string | number) => {
    setProjectDetails({ ...projectDetails, [field]: value });
  };

  const calculateTotal = () => {
    return boqItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateEstimatedCost = () => {
    const { subcontractCost, equipmentCost, materialCost, labourCost } = projectDetails;
    return subcontractCost + equipmentCost + materialCost + labourCost;
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bill of Quantity</h1>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
              <FiSave /> Save
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2">
              <FiX /> Discard
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
              <FiFileText /> Draft
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                className={`px-4 py-2 rounded-md transition-colors ${
                  formStatus === status.value
                    ? "bg-blue-600 text-white"
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
          <FormField
            label="Project"
            name="project"
            value={projectDetails.project}
            onChange={(e) => handleProjectDetailsChange("project", e.target.value)}
          />
          <FormField
            label="Subcontract Cost"
            name="subcontractCost"
            type="number"
            value={projectDetails.subcontractCost}
            onChange={(e) => handleProjectDetailsChange("subcontractCost", parseFloat(e.target.value))}
          />
          <FormField
            label="Equipment Cost"
            name="equipmentCost"
            type="number"
            value={projectDetails.equipmentCost}
            onChange={(e) => handleProjectDetailsChange("equipmentCost", parseFloat(e.target.value))}
          />
          <FormField
            label="Material Cost"
            name="materialCost"
            type="number"
            value={projectDetails.materialCost}
            onChange={(e) => handleProjectDetailsChange("materialCost", parseFloat(e.target.value))}
          />
          <FormField
            label="Labour Cost"
            name="labourCost"
            type="number"
            value={projectDetails.labourCost}
            onChange={(e) => handleProjectDetailsChange("labourCost", parseFloat(e.target.value))}
          />
          <div>
            <label className="block text-gray-700 font-medium mb-2">Estimated Cost</label>
            <div className="text-2xl font-bold text-blue-600">
              ${calculateEstimatedCost().toLocaleString()}
            </div>
          </div>
        </form>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bill of Quantity Items</h2>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Type
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Type
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit of Measure
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {boqItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-4 px-4 text-sm text-gray-900">{item.key}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{item.employee}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{item.type}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{item.description}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{item.unitOfMeasure}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{item.quantity}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">${item.rate.toFixed(2)}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">${item.total.toFixed(2)}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    <button
                      onClick={() => setBoqItems(boqItems.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td colSpan={6} className="py-3 px-4 font-bold text-right">
                  Total:
                </td>
                <td className="py-3 px-4 font-bold">
                  ${calculateTotal().toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
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
                Add New BOQ Item
              </h2>
              <FormField
                label="Key"
                name="key"
                value={newItem.key}
                onChange={(e) => handleInputChange("key", e.target.value)}
              />
              <FormField
                label="Employee"
                name="employee"
                value={newItem.employee}
                onChange={(e) => handleInputChange("employee", e.target.value)}
              />
              <FormField
                label="Type"
                name="type"
                value={newItem.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              />
              <FormField
                label="Description"
                name="description"
                value={newItem.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
              <FormField
                label="Unit of Measure"
                name="unitOfMeasure"
                value={newItem.unitOfMeasure}
                onChange={(e) => handleInputChange("unitOfMeasure", e.target.value)}
              />
              <FormField
                label="Quantity"
                name="quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => handleInputChange("quantity", parseFloat(e.target.value))}
              />
              <FormField
                label="Rate"
                name="rate"
                type="number"
                value={newItem.rate}
                onChange={(e) => handleInputChange("rate", parseFloat(e.target.value))}
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

export default BillOfQuantity;