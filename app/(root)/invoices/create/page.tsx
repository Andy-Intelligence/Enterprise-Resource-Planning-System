"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface InvoiceItem {
  id: string;
  itemDetails: string;
  quantity: number;
  rate: number;
  tax: number;
  amount: number;
}

const CreateInvoice: React.FC = () => {
  const router = useRouter();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newInvoiceItem, setNewInvoiceItem] = useState<Partial<InvoiceItem>>({
    itemDetails: "",
    quantity: 0,
    rate: 0,
    tax: 0,
    amount: 0,
  });
  const [invoiceDetails, setInvoiceDetails] = useState({
    customerName: "",
    invoiceCode: "INV-000001",
    invoiceDate: "",
    terms: "",
    dueDate: "",
    customerNote: "",
  });

  const handleAddItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        ...newInvoiceItem,
        id: (invoiceItems.length + 1).toString(),
      } as InvoiceItem,
    ]);
    setIsDialogOpen(false);
    setNewInvoiceItem({
      itemDetails: "",
      quantity: 0,
      rate: 0,
      tax: 0,
      amount: 0,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Create Invoice</div>
      <div className="mb-4">
        <label className="block mb-2">Customer Name</label>
        <input
          type="text"
          name="customerName"
          className="w-full px-4 py-2 border rounded-md"
          value={invoiceDetails.customerName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Invoice Code</label>
        <input
          type="text"
          name="invoiceCode"
          className="w-full px-4 py-2 border rounded-md"
          value={invoiceDetails.invoiceCode}
          onChange={handleInputChange}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Invoice Date</label>
        <input
          type="date"
          name="invoiceDate"
          className="w-full px-4 py-2 border rounded-md"
          value={invoiceDetails.invoiceDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Terms</label>
        <input
          type="text"
          name="terms"
          className="w-full px-4 py-2 border rounded-md"
          value={invoiceDetails.terms}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Due Date</label>
        <input
          type="date"
          name="dueDate"
          className="w-full px-4 py-2 border rounded-md"
          value={invoiceDetails.dueDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="text-2xl font-bold mb-4">Invoice Items</div>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Item Details</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Rate</th>
              <th className="py-2 px-4 border-b">Tax</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.itemDetails}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">{item.rate}</td>
                <td className="py-2 px-4 border-b">{item.tax}</td>
                <td className="py-2 px-4 border-b">{item.amount}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md"
                    onClick={() =>
                      setInvoiceItems(
                        invoiceItems.filter((i) => i.id !== item.id)
                      )
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md mb-4"
        onClick={() => setIsDialogOpen(true)}
      >
        Add Item
      </button>

      <div className="text-2xl font-bold mb-4">
        Grand Total: ₦{invoiceItems.reduce((acc, item) => acc + item.amount, 0)}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Customer Note</label>
        <textarea
          name="customerNote"
          className="w-full px-4 py-2 border rounded-md"
          value={invoiceDetails.customerNote}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Save as Draft
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">
          Save and Send
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">
          Cancel
        </button>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-md">
            <div className="mb-4">
              <label className="block mb-2">Item Details</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={newInvoiceItem.itemDetails}
                onChange={(e) =>
                  setNewInvoiceItem({
                    ...newInvoiceItem,
                    itemDetails: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Quantity</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={newInvoiceItem.quantity}
                onChange={(e) =>
                  setNewInvoiceItem({
                    ...newInvoiceItem,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Rate</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={newInvoiceItem.rate}
                onChange={(e) =>
                  setNewInvoiceItem({
                    ...newInvoiceItem,
                    rate: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Tax</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={newInvoiceItem.tax}
                onChange={(e) =>
                  setNewInvoiceItem({
                    ...newInvoiceItem,
                    tax: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Amount</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={newInvoiceItem.amount}
                onChange={(e) =>
                  setNewInvoiceItem({
                    ...newInvoiceItem,
                    amount: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={handleAddItem}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
