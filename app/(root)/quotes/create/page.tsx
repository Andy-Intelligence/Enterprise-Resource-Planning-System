"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface QuoteItem {
  id: string;
  itemDetails: string;
  quantity: number;
  rate: number;
  tax: number;
  amount: number;
}

const CreateQuote: React.FC = () => {
  const router = useRouter();
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQuoteItem, setNewQuoteItem] = useState<Partial<QuoteItem>>({
    itemDetails: "",
    quantity: 0,
    rate: 0,
    tax: 0,
    amount: 0,
  });
  const [quoteDetails, setQuoteDetails] = useState({
    customerName: "",
    quoteCode: "QT-00001",
    referenceID: "",
    quoteDate: "",
    expiryDate: "",
    salesPerson: "",
    projectName: "",
    subject: "",
    customerNote: "",
    termsAndConditions: "",
    discount: 0,
    shippingCharges: 0,
    adjustment: 0,
    attachment: [] as File[],
  });

  const handleAddItem = () => {
    setQuoteItems([
      ...quoteItems,
      { ...newQuoteItem, id: (quoteItems.length + 1).toString() } as QuoteItem,
    ]);
    setIsDialogOpen(false);
    setNewQuoteItem({
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
    setQuoteDetails({ ...quoteDetails, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 3); // Maximum of 3 files
      setQuoteDetails({ ...quoteDetails, attachment: filesArray });
    }
  };

  const calculateSubtotal = () => {
    return quoteItems.reduce((acc, item) => acc + item.amount, 0);
  };

  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * quoteDetails.discount) / 100;
    const total =
      subtotal -
      discountAmount +
      quoteDetails.shippingCharges +
      quoteDetails.adjustment;
    return total;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Create Quote</div>

      <div className="mb-4">
        <label className="block mb-2">Customer Name</label>
        <input
          type="text"
          name="customerName"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.customerName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Quote Code</label>
        <input
          type="text"
          name="quoteCode"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.quoteCode}
          onChange={handleInputChange}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Reference ID</label>
        <input
          type="text"
          name="referenceID"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.referenceID}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Quote Date</label>
        <input
          type="date"
          name="quoteDate"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.quoteDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.expiryDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Salesperson</label>
        <input
          type="text"
          name="salesPerson"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.salesPerson}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Project Name</label>
        <input
          type="text"
          name="projectName"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.projectName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Subject</label>
        <input
          type="text"
          name="subject"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.subject}
          onChange={handleInputChange}
        />
      </div>

      <div className="text-2xl font-bold mb-4">Quote Items</div>
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
            {quoteItems.map((item) => (
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
                      setQuoteItems(quoteItems.filter((i) => i.id !== item.id))
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
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={() => setIsDialogOpen(true)}
      >
        Add Item
      </button>

      <div className="flex justify-between mb-4">
        <div className="text-2xl font-bold">Subtotal</div>
        <div className="text-2xl font-bold">
          ₦{calculateSubtotal().toFixed(2)}
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="text-xl">Discount (%)</div>
          <input
            type="number"
            name="discount"
            className="w-20 ml-2 px-2 py-1 border rounded-md"
            value={quoteDetails.discount}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-xl">
          ₦{((calculateSubtotal() * quoteDetails.discount) / 100).toFixed(2)}
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="text-xl">Shipping Charges</div>
          <input
            type="number"
            name="shippingCharges"
            className="w-20 ml-2 px-2 py-1 border rounded-md"
            value={quoteDetails.shippingCharges}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-xl">
          ₦{quoteDetails.shippingCharges.toFixed(2)}
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="text-xl">Adjustment</div>
          <input
            type="number"
            name="adjustment"
            className="w-20 ml-2 px-2 py-1 border rounded-md"
            value={quoteDetails.adjustment}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-xl">₦{quoteDetails.adjustment.toFixed(2)}</div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="text-2xl font-bold">Grand Total</div>
        <div className="text-2xl font-bold">
          ₦{calculateGrandTotal().toFixed(2)}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Customer Note</label>
        <textarea
          name="customerNote"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.customerNote}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Terms and Conditions</label>
        <textarea
          name="termsAndConditions"
          className="w-full px-4 py-2 border rounded-md"
          value={quoteDetails.termsAndConditions}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Attachments (max 3 files)</label>
        <input
          type="file"
          multiple
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex justify-between">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Save as Draft
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
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
                value={newQuoteItem.itemDetails}
                onChange={(e) =>
                  setNewQuoteItem({
                    ...newQuoteItem,
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
                value={newQuoteItem.quantity}
                onChange={(e) =>
                  setNewQuoteItem({
                    ...newQuoteItem,
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
                value={newQuoteItem.rate}
                onChange={(e) =>
                  setNewQuoteItem({
                    ...newQuoteItem,
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
                value={newQuoteItem.tax}
                onChange={(e) =>
                  setNewQuoteItem({
                    ...newQuoteItem,
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
                value={newQuoteItem.amount}
                onChange={(e) =>
                  setNewQuoteItem({
                    ...newQuoteItem,
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
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
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

export default CreateQuote;
