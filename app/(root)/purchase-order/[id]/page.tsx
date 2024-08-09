"use client";

import React from "react";
import {
  FiPackage,
  FiTruck,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface ItemDetail {
  id: string;
  item: string;
  quantity: number;
  unit: string;
  status: string;
}

interface PurchaseOrderData {
  id: string;
  supplierName: string;
  paymentTerms: string;
  requisitionId: string;
  deliveryAddress: string;
  shippingMethod: string;
  date: string;
  approvedBy: string;
  items: ItemDetail[];
  totalAmount: number;
  status: "Pending" | "Approved" | "Shipped" | "Delivered";
}

const dummyPurchaseOrder: PurchaseOrderData = {
  id: "PO-2024-001",
  supplierName: "Tech Supplies Inc.",
  paymentTerms: "Net 30",
  requisitionId: "REQ-2024-005",
  deliveryAddress: "123 Innovation Ave, Tech City, TC 12345",
  shippingMethod: "Express Shipping",
  date: "2024-08-15",
  approvedBy: "Jane Manager",
  items: [
    {
      id: "1",
      item: "High-performance Laptop",
      quantity: 10,
      unit: "pcs",
      status: "ordered",
    },
    {
      id: "2",
      item: "4K Monitor",
      quantity: 15,
      unit: "pcs",
      status: "pending",
    },
    {
      id: "3",
      item: "Ergonomic Chair",
      quantity: 20,
      unit: "pcs",
      status: "delivered",
    },
  ],
  totalAmount: 25000,
  status: "Approved",
};

const PurchaseOrderDisplay: React.FC = () => {
  const order = dummyPurchaseOrder;

  const StatusBadge: React.FC<{ status: PurchaseOrderData["status"] }> = ({
    status,
  }) => {
    const colorClass =
      status === "Approved"
        ? "bg-green-100 text-green-800"
        : status === "Pending"
        ? "bg-yellow-100 text-yellow-800"
        : status === "Shipped"
        ? "bg-blue-100 text-blue-800"
        : "bg-purple-100 text-purple-800";
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
            <h1 className="text-4xl font-bold mb-2">
              Purchase Order: {order.id}
            </h1>
            <p className="text-blue-100 mb-6">Supplier: {order.supplierName}</p>
            <div className="flex items-center space-x-4">
              <StatusBadge status={order.status} />
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-blue-200" />
                <span className="font-semibold">Order Date: {order.date}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Amount"
                value={`$${order.totalAmount.toLocaleString()}`}
                icon={<FiDollarSign className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Items"
                value={order.items.length}
                icon={<FiPackage className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Shipping Method"
                value={order.shippingMethod}
                icon={<FiTruck className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Approved By"
                value={order.approvedBy}
                icon={<FiUser className="text-blue-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Order Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="items"
                >
                  Items
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
                      Order Information
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Requisition ID:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {order.requisitionId}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Payment Terms:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {order.paymentTerms}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Delivery Address:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {order.deliveryAddress}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Status Overview
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            Order Progress
                          </span>
                          <span className="text-sm font-medium text-blue-600">
                            75%
                          </span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Estimated Delivery
                        </span>
                        <span className="text-sm font-semibold text-gray-800">
                          Aug 25, 2024
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
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.items.map((item) => (
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
                          <td className="py-4 px-4 text-sm">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "ordered"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status.charAt(0).toUpperCase() +
                                item.status.slice(1)}
                            </span>
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
                      Order Summary
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm font-medium text-gray-600">
                          Subtotal
                        </dt>
                        <dd className="text-sm text-gray-800">
                          ${(order.totalAmount * 0.9).toLocaleString()}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm font-medium text-gray-600">
                          Tax (10%)
                        </dt>
                        <dd className="text-sm text-gray-800">
                          ${(order.totalAmount * 0.1).toLocaleString()}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between border-t pt-2">
                        <dt className="text-base font-semibold text-gray-900">
                          Total
                        </dt>
                        <dd className="text-base font-semibold text-gray-900">
                          ${order.totalAmount.toLocaleString()}
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
                        <span>Order approved and processed</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiTruck className="text-blue-500 mr-2" />
                        <span>Shipping arranged with carrier</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiAlertTriangle className="text-yellow-500 mr-2" />
                        <span>Please confirm delivery address</span>
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

export default PurchaseOrderDisplay;
