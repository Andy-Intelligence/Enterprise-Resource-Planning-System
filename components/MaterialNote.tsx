"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MaterialNote = () => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-bankGradient">
        Material Note
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {/* Description for Quotation */}
        <div className="mb-4">
          <Label
            htmlFor="quotationDescription"
            className="block text-sm font-semibold mb-2"
          >
            Description for Quotation
          </Label>
          <Textarea
            id="quotationDescription"
            className="w-full bg-gray-200"
            placeholder="Enter description for quotation"
          />
        </div>

        {/* Description for Vendors */}
        <div className="mb-4">
          <Label
            htmlFor="vendorDescription"
            className="block text-sm font-semibold mb-2"
          >
            Description for Vendors
          </Label>
          <Textarea
            id="vendorDescription"
            className="w-full bg-gray-200"
            placeholder="Enter description for vendors"
          />
        </div>

        {/* Description for Pickings */}
        <div className="mb-4">
          <Label
            htmlFor="pickingDescription"
            className="block text-sm font-semibold mb-2"
          >
            Description for Pickings
          </Label>
          <Textarea
            id="pickingDescription"
            className="w-full bg-gray-200"
            placeholder="Enter description for pickings"
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialNote;
