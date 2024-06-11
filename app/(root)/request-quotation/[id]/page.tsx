"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const statusOptions = [
  { label: "RFQ", value: "rfq" },
  { label: "RFQ Sent", value: "rfq sent" },
  { label: "Purchase Order", value: "purchase order" },
];

interface DemandItem {
  product: string;
  description: string;
  scheduledDate: string;
  quantity: string;
  unitPrice: string;
  taxes: string;
  subTotal: string;
  status: string;
}

const QuotationComponent: React.FC = () => {
  const router = useRouter();
  const [initialDemand, setInitialDemand] = useState<DemandItem[]>([
    {
      product: "Product 1",
      description: "Description 1",
      scheduledDate: "Scheduled Date 1",
      quantity: "Quantity 1",
      unitPrice: "Unit Price 1",
      taxes: "Taxes 1",
      subTotal: "SubTotal 1",
      status: "Status 1",
    },
    {
      product: "Product 2",
      description: "Description 2",
      scheduledDate: "Scheduled Date 2",
      quantity: "Quantity 2",
      unitPrice: "Unit Price 2",
      taxes: "Taxes 2",
      subTotal: "SubTotal 2",
      status: "Status 2",
    },
  ]);
  const [formStatus, setFormStatus] = useState<string>("draft");
  const [selectedRow, setSelectedRow] = useState<DemandItem | null>(null);

  const handleAddItem = () => {
    setInitialDemand([
      ...initialDemand,
      {
        product: "",
        quantity: "",
        description: "",
        scheduledDate: "",
        unitPrice: "",
        taxes: "",
        subTotal: "",
        status: "",
      },
    ]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newData = initialDemand.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setInitialDemand(newData);
  };

  const openDialog = (row: DemandItem) => {
    setSelectedRow(row);
  };

  return (
    <div className="border rounded-lg p-4 relative">
      <div className="text-3xl font-bold mb-4">
        Request For Quotation / [PO00008] / [N2,000,000]
      </div>
      <div className="flex gap-2 items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <Button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Send RFQ By Email
          </Button>
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            variant="outline"
          >
            Print RFQ
          </Button>
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            variant="outline"
          >
            Confirm Order
          </Button>
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            variant="outline"
          >
            Cancel
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              className={`px-2 py-1 text-xs rounded-full ${
                formStatus === status.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              style={{ minWidth: "80px", textAlign: "center" }}
              onClick={() => setFormStatus(status.value)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="mb-4">
              <Label className="font-bold" htmlFor="requestQuotation">
                Request for Quotation
              </Label>
              <div>PO0008</div>
            </div>
            <div className="mb-4">
              <Label className="font-bold" htmlFor="partner">
                Vendor
              </Label>
              <div>Abigail</div>
            </div>
            <div className="mb-4">
              <Label className="font-bold" htmlFor="vendorReference">
                Vendor Reference
              </Label>
              <div>r00090034</div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <Label className="font-bold"  htmlFor="orderDate">
                Order Date
              </Label>
              <div>10/31/2017 17:42:10</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="products"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="di"
            >
              Deliveries and Invoices
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <div className="mt-4">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Product</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Scheduled Date</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Unit Price</th>
                    <th className="py-2 px-4 border-b">Taxes</th>
                    <th className="py-2 px-4 border-b">SubTotal</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {initialDemand.map((row, index) => (
                    <Dialog key={index} onOpenChange={() => openDialog(row)}>
                      <DialogTrigger asChild>
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">{row.product}</td>
                          <td className="py-2 px-4 border-b">
                            {row.description}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {row.scheduledDate}
                          </td>
                          <td className="py-2 px-4 border-b">{row.quantity}</td>
                          <td className="py-2 px-4 border-b">
                            {row.unitPrice}
                          </td>
                          <td className="py-2 px-4 border-b">{row.taxes}</td>
                          <td className="py-2 px-4 border-b">{row.subTotal}</td>
                          <td className="py-2 px-4 border-b text-center">
                            <Button
                              variant="ghost"
                              onClick={() => {
                                const newData = initialDemand.filter(
                                  (_, i) => i !== index
                                );
                                setInitialDemand(newData);
                              }}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      </DialogTrigger>
                      {selectedRow && (
                        <DialogContent className="bg-gray-200">
                          <DialogTitle>Open: Order Lines</DialogTitle>
                          <div className="p-4">
                            <p>
                              <strong>Product:</strong> {selectedRow.product}
                            </p>
                            <p>
                              <strong>Quantity:</strong> {selectedRow.quantity}
                            </p>
                            <p>
                              <strong>Unit Price:</strong>{" "}
                              {selectedRow.unitPrice}
                            </p>
                            <p>
                              <strong>Taxes:</strong> {selectedRow.taxes}
                            </p>
                            <p>
                              <strong>Scheduled Date:</strong>{" "}
                              {selectedRow.scheduledDate}
                            </p>
                            <Tabs defaultValue="notes" className="w-full mt-4">
                              <TabsList>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                                <TabsTrigger value="invoices">
                                  Invoices and Incoming Shipments
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="notes">
                                <textarea
                                  rows={4}
                                  className="w-full border rounded-md p-2"
                                  placeholder="Write your notes here..."
                                ></textarea>
                              </TabsContent>
                              <TabsContent value="invoices">
                                <p>Invoices and Incoming Shipments</p>
                              </TabsContent>
                            </Tabs>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  ))}
                </tbody>
              </table>
              <Button onClick={handleAddItem} className="mt-4">
                Add Item
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="di">di</TabsContent>
        </Tabs>
      </form>
      <div className="flex w-full justify-end mb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-1">
            <div className="font-semibold">Untaxed Amount:</div>
            <p>2,000,0000</p>
          </div>
          <div className="flex items-center justify-start gap-1">
            <div className="font-semibold">Taxes:</div>
            <p>2,000,0000</p>
          </div>
          <div className="flex items-center justify-start gap-1">
            <div className="font-semibold">Total:</div>
            <p>2,000,0000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationComponent;
