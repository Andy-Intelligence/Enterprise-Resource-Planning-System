"use client";

import React from "react";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiPackage,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InvoiceItem {
  id: string;
  itemDetails: string;
  quantity: number;
  rate: number;
  tax: number;
  amount: number;
}

interface InvoiceData {
  id: string;
  customerName: string;
  invoiceCode: string;
  invoiceDate: string;
  terms: string;
  dueDate: string;
  customerNote: string;
  items: InvoiceItem[];
  status: "Paid" | "Unpaid" | "Overdue";
}

const dummyInvoice: InvoiceData = {
  id: "INV-2024-001",
  customerName: "Acme Corporation",
  invoiceCode: "INV-000001",
  invoiceDate: "2024-08-01",
  terms: "Net 30",
  dueDate: "2024-08-31",
  customerNote: "Thank you for your business!",
  status: "Unpaid",
  items: [
    {
      id: "1",
      itemDetails: "Web Development Services",
      quantity: 80,
      rate: 100,
      tax: 5,
      amount: 8400,
    },
    {
      id: "2",
      itemDetails: "UI/UX Design",
      quantity: 40,
      rate: 120,
      tax: 5,
      amount: 5040,
    },
  ],
};

const DisplayInvoiceDetails: React.FC = () => {
  const invoice = dummyInvoice;

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
  }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  const calculateTotal = () => {
    return invoice.items.reduce((acc, item) => acc + item.amount, 0);
  };

  const calculateTax = () => {
    return invoice.items.reduce((acc, item) => acc + item.tax, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">
              Invoice: {invoice.invoiceCode}
            </h1>
            <p className="text-blue-100 mb-6">
              Customer: {invoice.customerName}
            </p>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  invoice.status === "Paid"
                    ? "bg-green-200 text-green-800"
                    : invoice.status === "Unpaid"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {invoice.status}
              </span>
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-blue-200" />
                <span className="font-semibold">Due: {invoice.dueDate}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Amount"
                value={`₦${calculateTotal().toLocaleString()}`}
                icon={<FiDollarSign className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Invoice Date"
                value={invoice.invoiceDate}
                icon={<FiCalendar className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Due Date"
                value={invoice.dueDate}
                icon={<FiClock className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Items"
                value={invoice.items.length}
                icon={<FiPackage className="text-blue-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Invoice Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="items"
                >
                  Invoice Items
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Customer Information
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600 flex items-center">
                          <FiUser className="mr-2" /> Customer:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {invoice.customerName}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600 flex items-center">
                          <FiFileText className="mr-2" /> Invoice Code:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {invoice.invoiceCode}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600 flex items-center">
                          <FiCalendar className="mr-2" /> Invoice Date:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {invoice.invoiceDate}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600 flex items-center">
                          <FiClock className="mr-2" /> Due Date:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {invoice.dueDate}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Additional Information
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Terms:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {invoice.terms}
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Customer Note:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {invoice.customerNote}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="items">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item Details
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rate
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tax
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {invoice.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-4 px-4 text-sm text-gray-900">
                            {item.itemDetails}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            ₦{item.rate}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            ₦{item.tax}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900">
                            ₦{item.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan={3}
                          className="py-4 px-4 text-sm font-medium text-gray-500 text-right"
                        >
                          Subtotal:
                        </td>
                        <td
                          colSpan={2}
                          className="py-4 px-4 text-sm font-medium text-gray-900"
                        >
                          ₦
                          {(calculateTotal() - calculateTax()).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          className="py-4 px-4 text-sm font-medium text-gray-500 text-right"
                        >
                          Tax:
                        </td>
                        <td
                          colSpan={2}
                          className="py-4 px-4 text-sm font-medium text-gray-900"
                        >
                          ₦{calculateTax().toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td
                          colSpan={3}
                          className="py-4 px-4 text-base font-semibold text-gray-900 text-right"
                        >
                          Total:
                        </td>
                        <td
                          colSpan={2}
                          className="py-4 px-4 text-base font-semibold text-gray-900"
                        >
                          ₦{calculateTotal().toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayInvoiceDetails;
