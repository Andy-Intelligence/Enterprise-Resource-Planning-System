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

const MaterialSaleCondition = () => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-bankGradient">
        Material Sale Condition
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <Label
              htmlFor="customerLeadTime"
              className="block text-sm font-semibold mb-2"
            >
              Customer Lead Time
            </Label>
            <div className="flex items-center">
              <Input
                type="number"
                id="customerLeadTime"
                className="border rounded-md px-4 py-2 w-full"
              />
              <span className="ml-2">days</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>{/* Add more fields here if needed */}</div>
      </div>
    </div>
  );
};

export default MaterialSaleCondition;
