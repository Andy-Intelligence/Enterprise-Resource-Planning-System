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

const MaterialInventory = () => {
  const [selectedRoute, setSelectedRoute] = useState("buy");

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Material Inventory</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {/* Route Section */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Route</h3>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="buy"
                name="route"
                value="buy"
                checked={selectedRoute === "buy"}
                onChange={() => setSelectedRoute("buy")}
                className="mr-2"
              />
              <label htmlFor="buy" className="text-sm font-semibold">
                Buy
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="makeToOrder"
                name="route"
                value="makeToOrder"
                checked={selectedRoute === "makeToOrder"}
                onChange={() => setSelectedRoute("makeToOrder")}
                className="mr-2"
              />
              <label htmlFor="makeToOrder" className="text-sm font-semibold">
                Make to Order
              </label>
            </div>
          </div>

          {/* Procurement Location */}
          <div className="mb-4">
            <Label
              htmlFor="procurementLocation"
              className="block text-sm font-semibold mb-2"
            >
              Procurement Location
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Procurement Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Procurement Location</SelectLabel>
                  <SelectItem value="location1">Location 1</SelectItem>
                  <SelectItem value="location2">Location 2</SelectItem>
                  <SelectItem value="location3">Location 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Inventory Location */}
          <div className="mb-4">
            <Label
              htmlFor="inventoryLocation"
              className="block text-sm font-semibold mb-2"
            >
              Inventory Location
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Inventory Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Inventory Location</SelectLabel>
                  <SelectItem value="location1">Location 1</SelectItem>
                  <SelectItem value="location2">Location 2</SelectItem>
                  <SelectItem value="location3">Location 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Production Location */}
          <div className="mb-4">
            <Label
              htmlFor="productionLocation"
              className="block text-sm font-semibold mb-2"
            >
              Production Location
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Production Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Production Location</SelectLabel>
                  <SelectItem value="location1">Location 1</SelectItem>
                  <SelectItem value="location2">Location 2</SelectItem>
                  <SelectItem value="location3">Location 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Weight */}
          <div className="mb-4">
            <Label
              htmlFor="weight"
              className="block text-sm font-semibold mb-2"
            >
              Weight
            </Label>
            <Input
              type="text"
              id="weight"
              className="border rounded-md px-4 py-2 w-full"
              placeholder="Enter Weight"
            />
          </div>

          {/* Volume */}
          <div className="mb-4">
            <Label
              htmlFor="volume"
              className="block text-sm font-semibold mb-2"
            >
              Volume
            </Label>
            <Input
              type="text"
              id="volume"
              className="border rounded-md px-4 py-2 w-full"
              placeholder="Enter Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialInventory;
