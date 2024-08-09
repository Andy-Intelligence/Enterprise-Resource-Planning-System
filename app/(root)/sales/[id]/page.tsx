"use client";

import React from "react";
import {
  FiPackage,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface SaleItem {
  id: string;
  item: string;
  quantity: number;
  unit: string;
  totalCost: number;
  paidAmount: number;
}

interface SaleData {
  id: string;
  customer: string;
  salesPerson: string;
  shippingAddress: string;
  date: string;
  status: "Pending" | "Sold";
  items: SaleItem[];
  totalAmount: number;
  paidAmount: number;
}

const dummySale: SaleData = {
  id: "SALE-2024-001",
  customer: "Acme Corporation",
  salesPerson: "John Doe",
  shippingAddress: "123 Business Ave, Corporate City, CC 54321",
  date: "2024-08-15",
  status: "Sold",
  items: [
    {
      id: "1",
      item: "Premium Widget",
      quantity: 100,
      unit: "pcs",
      totalCost: 5000,
      paidAmount: 5000,
    },
    {
      id: "2",
      item: "Deluxe Gadget",
      quantity: 50,
      unit: "pcs",
      totalCost: 7500,
      paidAmount: 7500,
    },
    {
      id: "3",
      item: "Super Gizmo",
      quantity: 25,
      unit: "pcs",
      totalCost: 6250,
      paidAmount: 5000,
    },
  ],
  totalAmount: 18750,
  paidAmount: 17500,
};

const DisplaySaleDetails: React.FC = () => {
  const sale = dummySale;

  const StatusBadge: React.FC<{ status: SaleData["status"] }> = ({
    status,
  }) => {
    const colorClass =
      status === "Sold"
        ? "bg-green-100 text-green-800"
        : "bg-yellow-100 text-yellow-800";
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}
      >
        {status}
      </span>
    );
  };

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

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">Sale: {sale.id}</h1>
            <p className="text-blue-100 mb-6">Customer: {sale.customer}</p>
            <div className="flex items-center space-x-4">
              <StatusBadge status={sale.status} />
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-blue-200" />
                <span className="font-semibold">Sale Date: {sale.date}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Amount"
                value={`$${sale.totalAmount.toLocaleString()}`}
                icon={<FiDollarSign className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Paid Amount"
                value={`$${sale.paidAmount.toLocaleString()}`}
                icon={<FiCheckCircle className="text-green-600 text-2xl" />}
              />
              <StatCard
                title="Items Sold"
                value={sale.items.length}
                icon={<FiPackage className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Sales Person"
                value={sale.salesPerson}
                icon={<FiUser className="text-blue-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Sale Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="items"
                >
                  Sold Items
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="summary"
                >
                  Summary
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Sale Information
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Customer:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {sale.customer}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Sales Person:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {sale.salesPerson}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Shipping Address:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {sale.shippingAddress}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Payment Status
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            Payment Progress
                          </span>
                          <span className="text-sm font-medium text-blue-600">
                            {(
                              (sale.paidAmount / sale.totalAmount) *
                              100
                            ).toFixed(2)}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(sale.paidAmount / sale.totalAmount) * 100}
                          className="h-2"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Remaining Amount
                        </span>
                        <span className="text-sm font-semibold text-gray-800">
                          $
                          {(
                            sale.totalAmount - sale.paidAmount
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="items">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Cost
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Paid Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sale.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-4 px-4 text-sm text-gray-900">
                            {item.item}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {item.unit}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900">
                            ${item.totalCost.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900">
                            ${item.paidAmount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="summary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Sale Summary
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm font-medium text-gray-600">
                          Subtotal
                        </dt>
                        <dd className="text-sm text-gray-800">
                          ${sale.totalAmount.toLocaleString()}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm font-medium text-gray-600">
                          Taxes
                        </dt>
                        <dd className="text-sm text-gray-800">$0.00</dd>
                      </div>
                      <div className="flex items-center justify-between border-t pt-2">
                        <dt className="text-base font-semibold text-gray-900">
                          Total
                        </dt>
                        <dd className="text-base font-semibold text-gray-900">
                          ${sale.totalAmount.toLocaleString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Additional Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <FiCheckCircle className="text-green-500 mr-2" />
                        <span>
                          Sale{" "}
                          {sale.status === "Sold" ? "completed" : "pending"}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiTruck className="text-blue-500 mr-2" />
                        <span>Shipping arranged</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiDollarSign className="text-yellow-500 mr-2" />
                        <span>
                          {sale.paidAmount < sale.totalAmount
                            ? "Partial payment received"
                            : "Full payment received"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySaleDetails;
