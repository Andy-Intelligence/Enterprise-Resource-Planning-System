"use client";
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
import { Textarea } from "@/components/ui/textarea";

const vendorsList = [
  { name: "Vendor 1", phone: "123-456-7890", email: "vendor1@example.com" },
  { name: "Vendor 2", phone: "987-654-3210", email: "vendor2@example.com" },
  { name: "Vendor 3", phone: "456-789-0123", email: "vendor3@example.com" },
];

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const NewMaterialRequisitionForm: React.FC = () => {
  const router = useRouter();
  const [initialDemand, setInitialDemand] = useState([
    { product: "", quantity: "", status: "" },
  ]);
  const [formStatus, setFormStatus] = useState("draft");
  const [vendors, setVendors] = useState(vendorsList);
  const [searchInput, setSearchInput] = useState("");
  const [selectedVendors, setSelectedVendors] = useState<typeof vendorsList>(
    []
  );

  const handleAddItem = () => {
    setInitialDemand([
      ...initialDemand,
      { product: "", quantity: "", status: "" },
    ]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newData = initialDemand.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setInitialDemand(newData);
  };

  const filteredVendors = vendorsList.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleVendorSelect = (vendor: (typeof vendorsList)[0]) => {
    setSelectedVendors([...selectedVendors, vendor]);
    setSearchInput("");
  };

  return (
    <div className="border rounded-lg p-4 relative">
      <div className="text-3xl font-bold mb-4"> Requisition / New</div>
      <div className="flex gap-2 items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <Button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Save
          </Button>
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            variant="outline"
          >
            Discard
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                variant="outline"
              >
                Create Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-200 overflow-y-scroll max-h-screen">
              <DialogTitle>Create Purchase Order</DialogTitle>
              <div className="mt-4">
                <form className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="purchaseOrderId">Purchase Order ID</Label>
                    <Input type="text" id="purchaseOrderId" />
                  </div>
                  <div>
                    <Label htmlFor="requesitionId">Requisition ID</Label>
                    <Input type="text" id="requesitionId" />
                  </div>
                  <div>
                    <Label htmlFor="assignBy">Assign By</Label>
                    <Input type="text" id="assignBy" />
                  </div>
                  <div>
                    <Label htmlFor="supplierName">Supplier Name</Label>
                    <Input type="text" id="supplierName" />
                  </div>
                  <div>
                    <Label htmlFor="orderDate">Order Date</Label>
                    <Input type="date" id="orderDate" />
                  </div>
                  <div>
                    <Label htmlFor="expectedDeliveryDate">
                      Expected Delivery Date
                    </Label>
                    <Input type="date" id="expectedDeliveryDate" />
                  </div>
                  <div>
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Input type="text" id="paymentTerms" />
                  </div>
                  <div>
                    <Label htmlFor="paymentDueDate">Payment Due Date</Label>
                    <Input type="date" id="paymentDueDate" />
                  </div>
                  <div>
                    <Label htmlFor="shippingMethod">Shipping Method</Label>
                    <Input type="text" id="shippingMethod" />
                  </div>
                  <div>
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Input type="text" id="deliveryAddress" />
                  </div>
                </form>
              </div>

              <Button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Save
              </Button>
              <Button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                variant="outline"
              >
                Discard
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center space-x-2">
          {statusOptions.map((status, index) => (
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
              <Label htmlFor="taskJobOrderUser">Request By</Label>
              <div>current user id</div>
            </div>
            <div className="mb-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="description." id="description" />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="taskJobOrder">Task</Label>
              <Select>
                <SelectTrigger id="taskJobOrder">
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent className="bg-gray-200">
                  <SelectGroup>
                    <SelectItem value="task1">Task 1</SelectItem>
                    <SelectItem value="task2">Task 2</SelectItem>
                    <SelectItem value="task3">Task 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="constructionProject"> Project</Label>
              <Select>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="bg-gray-200">
                    <SelectItem value="project1">Project 1</SelectItem>
                    <SelectItem value="project2">Project 2</SelectItem>
                    <SelectItem value="project3">Project 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input type="date" id="scheduledDate" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="initialDemand" className="w-full">
          <TabsList>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="initialDemand"
            >
              Demand
            </TabsTrigger>
          </TabsList>
          <TabsContent value="initialDemand">
            <div className="mt-4">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Item</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {initialDemand.map((row, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          value={row.product}
                          onChange={(e) =>
                            handleInputChange(index, "product", e.target.value)
                          }
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="number"
                          value={row.quantity}
                          onChange={(e) =>
                            handleInputChange(index, "quantity", e.target.value)
                          }
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {statusOptions.map((status) => (
                                <SelectItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => {
                            const newData = initialDemand.filter(
                              (_, i) => i !== index
                            );
                            setInitialDemand(newData);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button onClick={handleAddItem} className="mt-4">
                Add Item
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default NewMaterialRequisitionForm;



