"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MaterialGeneralInformation = () => {
  const [selectedOption, setSelectedOption] = useState("ordered");

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-bankGradient">
        Material General Information
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <Label
              htmlFor="productType"
              className="block text-sm font-semibold mb-2"
            >
              Product Type
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Product</SelectLabel>
                  <SelectItem value="product1">Product 1</SelectItem>
                  <SelectItem value="product2">Product 2</SelectItem>
                  <SelectItem value="product3">Product 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label
              htmlFor="internalReference"
              className="block text-sm font-semibold mb-2"
            >
              Internal Reference
            </Label>
            <Input
              type="text"
              id="internalReference"
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="barCode"
              className="block text-sm font-semibold mb-2"
            >
              Bar Code
            </Label>
            <Input
              type="text"
              id="barCode"
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="internalCategory"
              className="block text-sm font-semibold mb-2"
            >
              Internal Category
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Internal Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Internal Category</SelectLabel>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                  <SelectItem value="category3">Category 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label
              htmlFor="boqType"
              className="block text-sm font-semibold mb-2"
            >
              BOQ Type
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select BOQ Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>BOQ Type</SelectLabel>
                  <SelectItem value="boq1">BOQ 1</SelectItem>
                  <SelectItem value="boq2">BOQ 2</SelectItem>
                  <SelectItem value="boq3">BOQ 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="mb-4">
            <Label
              htmlFor="salePrice"
              className="block text-sm font-semibold mb-2"
            >
              Sale Price
            </Label>
            <Input
              type="text"
              id="salePrice"
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="cost" className="block text-sm font-semibold mb-2">
              Cost
            </Label>
            <Input
              type="text"
              id="cost"
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="ordered"
                name="quantities"
                value="ordered"
                checked={selectedOption === "ordered"}
                onChange={() => setSelectedOption("ordered")}
                className="mr-2"
              />
              <label htmlFor="ordered" className="text-sm font-semibold">
                On Ordered Quantities
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="received"
                name="quantities"
                value="received"
                checked={selectedOption === "received"}
                onChange={() => setSelectedOption("received")}
                className="mr-2"
              />
              <label htmlFor="received" className="text-sm font-semibold">
                On Received Quantities
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialGeneralInformation;

