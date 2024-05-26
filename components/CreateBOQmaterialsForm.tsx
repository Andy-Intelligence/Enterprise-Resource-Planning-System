"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const CreateBOQmaterialsForm = () => {
  const [formData, setFormData] = useState({
    key: "",
    employee: "",
    type: "",
    description: "",
    unitOfMeasure: "",
    quantity: "",
    rate: "",
    total: 0,
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (e:any) => {
    const quantity = parseFloat(e.target.value) || 0;
    const total = quantity * 10; // Sample total calculation, replace with your logic
    setFormData({ ...formData, quantity: quantity.toString(), total });
  };
  const handleRateChange = (e:any) => {
    const rate = parseFloat(e.target.value) || 0;
    const total = rate * 10; // Sample total calculation, replace with your logic
    setFormData({ ...formData, rate: rate.toString(), total });
  };

  const handleSave = () => {
    // Save logic here
    console.log("Form data:", formData);
  };

  const handleDiscard = () => {
    // Discard logic here
    console.log("Form discarded");
  };

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer select-none">
        Add Item
      </DialogTrigger>
      <DialogContent className="bg-gray-200">
        <DialogHeader>
          <DialogTitle>Enter Details</DialogTitle>
          <DialogDescription>
            Please fill in the required fields
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <div className="mb-4">
            <Select>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Key" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="k1">Key 1</SelectItem>
                <SelectItem value="k2">Key 2</SelectItem>
                <SelectItem value="k3">Key 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            {/* <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
            >
              <option value="">Select Employee</option>
              <option value="employee1">Employee 1</option>
              <option value="employee2">Employee 2</option>
              <option value="employee3">Employee 3</option>
            </select> */}
            <Select>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="k1">Emp 1</SelectItem>
                <SelectItem value="k2">Emp 2</SelectItem>
                <SelectItem value="k3">Emp 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Input
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
            />
          </div>
          <div className="mb-4">
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <div className="mb-4">
            {/* <select
              name="unitOfMeasure"
              value={formData.unitOfMeasure}
              onChange={handleChange}
            >
              <option value="">Select Unit of Measure</option>
              <option value="kg">Kilogram</option>
              <option value="g">Gram</option>
              <option value="lb">Pound</option>
            </select> */}
            <Select>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Unit of Measure" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="k1">Kilogram</SelectItem>
                <SelectItem value="k2">Gram</SelectItem>
                <SelectItem value="k3">Pound</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Input
              name="quantity"
              type="text"
              value={formData.quantity}
              onChange={handleQuantityChange}
              placeholder="Quantity"
            />
          </div>
          <div className="mb-4">
            <Input
              name="rate"
              type="text"
              value={formData.rate}
              onChange={handleRateChange}
              placeholder="Rate"
            />
          </div>
          <div className="">Total: {formData.total}</div>
        </div>
        <div className="flex justify-end">
          <div
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer select-none"
            onClick={handleSave}
          >
            Save
          </div>
          <div
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer select-none"
            onClick={handleDiscard}
          >
            Discard
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBOQmaterialsForm;
