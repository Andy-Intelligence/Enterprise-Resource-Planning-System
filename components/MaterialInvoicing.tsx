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
import { Label } from "@/components/ui/label";

const MaterialInvoicing = () => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-bankGradient">
        Material Invoicing
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <Label
              htmlFor="incomeAccount"
              className="block text-sm font-semibold mb-2"
            >
              Income Account
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Income Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Income Account</SelectLabel>
                  <SelectItem value="account1">Account 1</SelectItem>
                  <SelectItem value="account2">Account 2</SelectItem>
                  <SelectItem value="account3">Account 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label
              htmlFor="customerTaxes"
              className="block text-sm font-semibold mb-2"
            >
              Customer Taxes
            </Label>
            {/* make this multiple select */}
            <Select > 
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Customer Taxes" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Customer Taxes</SelectLabel>
                  <SelectItem value="tax1">Tax 1</SelectItem>
                  <SelectItem value="tax2">Tax 2</SelectItem>
                  <SelectItem value="tax3">Tax 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label
              htmlFor="assetType"
              className="block text-sm font-semibold mb-2"
            >
              Asset Type
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Asset Type</SelectLabel>
                  <SelectItem value="asset1">Asset 1</SelectItem>
                  <SelectItem value="asset2">Asset 2</SelectItem>
                  <SelectItem value="asset3">Asset 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="mb-4">
            <Label
              htmlFor="expenseType"
              className="block text-sm font-semibold mb-2"
            >
              Expense Type
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Expense Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Expense Type</SelectLabel>
                  <SelectItem value="expense1">Expense 1</SelectItem>
                  <SelectItem value="expense2">Expense 2</SelectItem>
                  <SelectItem value="expense3">Expense 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label
              htmlFor="vendorTaxes"
              className="block text-sm font-semibold mb-2"
            >
              Vendor Taxes
            </Label>
            {/* make this multiple select */}
            <Select >
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Vendor Taxes" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Vendor Taxes</SelectLabel>
                  <SelectItem value="tax1">Tax 1</SelectItem>
                  <SelectItem value="tax2">Tax 2</SelectItem>
                  <SelectItem value="tax3">Tax 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label
              htmlFor="priceDifferenceAccount"
              className="block text-sm font-semibold mb-2"
            >
              Price Difference Account
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Price Difference Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-100">
                  <SelectLabel>Price Difference Account</SelectLabel>
                  <SelectItem value="account1">Account 1</SelectItem>
                  <SelectItem value="account2">Account 2</SelectItem>
                  <SelectItem value="account3">Account 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialInvoicing;
