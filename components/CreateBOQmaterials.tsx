"use client";

import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const CreateBOQmaterials: React.FC = () => {
  const [data, setData] = useState([
    {
      key: "1",
      employee: "John Doe",
      type: "Material",
      description: "Cement",
      unitOfMeasure: "Bags",
      quantity: 50,
      rate: 5,
      total: 250,
    },
    {
      key: "2",
      employee: "Jane Smith",
      type: "Labor",
      description: "Carpentry",
      unitOfMeasure: "Hours",
      quantity: 8,
      rate: 20,
      total: 160,
    },
    {
      key: "3",
      employee: "Alice Johnson",
      type: "Material",
      description: "Bricks",
      unitOfMeasure: "Pieces",
      quantity: 1000,
      rate: 0.5,
      total: 500,
    },
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [newItem, setNewItem] = useState({
    key: "",
    employee: "",
    type: "",
    description: "",
    unitOfMeasure: "",
    quantity: 0,
    rate: 0,
    total: 0,
  });

  const handleDialogOpen = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    resetNewItem();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSaveAndClose = () => {
    setData([...data, newItem]);
    handleDialogClose();
  };

  const handleSaveAndNew = () => {
    setData([...data, newItem]);
    resetNewItem();
  };

  const resetNewItem = () => {
    setNewItem({
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

  const handleDeleteRow = (rowIndex: number) => {
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <Button
          className="px-4 py-2 bg-blue-500 text-white"
          onClick={handleDialogOpen}
        >
          Add Item
        </Button>
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Key</th>
              <th className="border border-gray-200 px-4 py-2">Employee</th>
              <th className="border border-gray-200 px-4 py-2">Type</th>
              <th className="border border-gray-200 px-4 py-2">Description</th>
              <th className="border border-gray-200 px-4 py-2">
                Unit of Measure
              </th>
              <th className="border border-gray-200 px-4 py-2">Quantity</th>
              <th className="border border-gray-200 px-4 py-2">Rate</th>
              <th className="border border-gray-200 px-4 py-2">Total</th>
              <th className="border border-gray-200 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.key}>
                <td className="border border-gray-200 px-4 py-2">{row.key}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {row.employee}
                </td>
                <td className="border border-gray-200 px-4 py-2">{row.type}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {row.description}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {row.unitOfMeasure}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {row.quantity}
                </td>
                <td className="border border-gray-200 px-4 py-2">{row.rate}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {row.total}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <MdDelete
                    size={20}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteRow(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Key
              </label>
              <input
                type="text"
                name="key"
                value={newItem.key}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee
              </label>
              <input
                type="text"
                name="employee"
                value={newItem.employee}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                type="text"
                name="type"
                value={newItem.type}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit of Measure
              </label>
              <input
                type="text"
                name="unitOfMeasure"
                value={newItem.unitOfMeasure}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rate
              </label>
              <input
                type="number"
                name="rate"
                value={newItem.rate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total
              </label>
              <input
                type="number"
                name="total"
                value={newItem.total}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </form>
          <DialogFooter>
            <Button
              className="bg-green-500 text-white mr-2"
              onClick={handleSaveAndClose}
            >
              Save and Close
            </Button>
            <Button
              className="bg-blue-500 text-white mr-2"
              onClick={handleSaveAndNew}
            >
              Save and New
            </Button>
            <Button
              className="bg-red-500 text-white"
              onClick={handleDialogClose}
            >
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBOQmaterials;
