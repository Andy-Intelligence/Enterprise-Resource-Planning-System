"use client";

import React from "react";
import {
  FiUser,
  FiCalendar,
  FiPackage,
  FiDollarSign,
  FiFileText,
  FiPaperclip,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface QuoteItem {
  id: string;
  itemDetails: string;
  quantity: number;
  rate: number;
  tax: number;
  amount: number;
}

interface QuoteDetails {
  customerName: string;
  quoteCode: string;
  referenceID: string;
  quoteDate: string;
  expiryDate: string;
  salesPerson: string;
  projectName: string;
  subject: string;
  customerNote: string;
  termsAndConditions: string;
  discount: number;
  shippingCharges: number;
  adjustment: number;
  attachment: string[];
  items: QuoteItem[];
  status: "Draft" | "Sent" | "Accepted" | "Declined";
}

const dummyQuote: QuoteDetails = {
  customerName: "Acme Corporation",
  quoteCode: "QT-00001",
  referenceID: "REF-2024-001",
  quoteDate: "2024-08-15",
  expiryDate: "2024-09-15",
  salesPerson: "John Doe",
  projectName: "Office Renovation",
  subject: "Quote for Office Furniture and Equipment",
  customerNote: "Please review and let us know if you have any questions.",
  termsAndConditions: "Payment due within 30 days of acceptance.",
  discount: 5,
  shippingCharges: 500,
  adjustment: -200,
  attachment: ["quote_attachment_1.pdf", "product_catalog.pdf"],
  status: "Sent",
  items: [
    {
      id: "1",
      itemDetails: "Executive Desk",
      quantity: 5,
      rate: 1200,
      tax: 10,
      amount: 6600,
    },
    {
      id: "2",
      itemDetails: "Office Chair",
      quantity: 10,
      rate: 300,
      tax: 10,
      amount: 3300,
    },
    {
      id: "3",
      itemDetails: "Filing Cabinet",
      quantity: 3,
      rate: 500,
      tax: 10,
      amount: 1650,
    },
  ],
};

const DisplayQuoteDetails: React.FC = () => {
  const quote = dummyQuote;

  const calculateSubtotal = () => {
    return quote.items.reduce((acc, item) => acc + item.amount, 0);
  };

  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * quote.discount) / 100;
    return subtotal - discountAmount + quote.shippingCharges + quote.adjustment;
  };

  const StatusBadge: React.FC<{ status: QuoteDetails["status"] }> = ({
    status,
  }) => {
    const colorClass =
      status === "Accepted"
        ? "bg-green-100 text-green-800"
        : status === "Sent"
        ? "bg-blue-100 text-blue-800"
        : status === "Declined"
        ? "bg-red-100 text-red-800"
        : "bg-gray-100 text-gray-800";
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
    value: string;
    icon: React.ReactNode;
  }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">
              Quote: {quote.quoteCode}
            </h1>
            <p className="text-blue-100 mb-6">{quote.subject}</p>
            <div className="flex items-center space-x-4">
              <StatusBadge status={quote.status} />
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-blue-200" />
                <span className="font-semibold">
                  Expires: {quote.expiryDate}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Customer"
                value={quote.customerName}
                icon={<FiUser className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Project"
                value={quote.projectName}
                icon={<FiPackage className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Salesperson"
                value={quote.salesPerson}
                icon={<FiUser className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Grand Total"
                value={`₦${calculateGrandTotal().toFixed(2)}`}
                icon={<FiDollarSign className="text-blue-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="items" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="items"
                >
                  Quote Items
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Quote Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="summary"
                >
                  Summary
                </TabsTrigger>
              </TabsList>

              <TabsContent value="items">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
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
                      {quote.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm text-gray-900">
                            {item.itemDetails}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            ₦{item.rate.toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {item.tax}%
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                            ₦{item.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Quote Information
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Quote Code:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {quote.quoteCode}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Reference ID:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {quote.referenceID}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Quote Date:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {quote.quoteDate}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Expiry Date:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {quote.expiryDate}
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
                          Customer Note:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {quote.customerNote}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Terms & Conditions:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {quote.termsAndConditions}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600">
                          Attachments:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {quote.attachment.map((file, index) => (
                            <div key={index} className="flex items-center">
                              <FiPaperclip className="mr-2" />
                              <span>{file}</span>
                            </div>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="summary">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Quote Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">
                        ₦{calculateSubtotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Discount ({quote.discount}%):
                      </span>
                      <span className="font-medium">
                        -₦
                        {((calculateSubtotal() * quote.discount) / 100).toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping Charges:</span>
                      <span className="font-medium">
                        ₦{quote.shippingCharges.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adjustment:</span>
                      <span className="font-medium">
                        ₦{quote.adjustment.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-4 border-t">
                      <span className="text-lg font-semibold">
                        Grand Total:
                      </span>
                      <span className="text-lg font-bold">
                        ₦{calculateGrandTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-end space-x-4">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Print Quote
              </button>
              <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                Accept Quote
              </button>
              <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                Decline Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayQuoteDetails;
