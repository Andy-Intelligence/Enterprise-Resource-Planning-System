"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const NewMaterialRequisitionForm: React.FC = () => {
  const router = useRouter();
  const [initialDemand, setInitialDemand] = useState([
    { product: "", quantity: "", status: "" },
  ]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

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

  return (
    <div className="border rounded-lg p-4">
      <div className="text-3xl font-bold mb-4">Material Requisition / New</div>
      <div className="mb-4">
        <Button className="mr-2">Save</Button>
        <Button variant="outline">Discard</Button>
      </div>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Left Section */}
          <div>
            <div className="mb-4">
              <Label htmlFor="partner">Partner</Label>
              <Select>
                <SelectTrigger id="partner">
                  <SelectValue placeholder="Select a partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="partner1">Partner 1</SelectItem>
                    <SelectItem value="partner2">Partner 2</SelectItem>
                    <SelectItem value="partner3">Partner 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="taskJobOrder">Task/Job Orders</Label>
              <Select>
                <SelectTrigger id="taskJobOrder">
                  <SelectValue placeholder="Select a task/job order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="task1">Task 1</SelectItem>
                    <SelectItem value="task2">Task 2</SelectItem>
                    <SelectItem value="task3">Task 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="taskJobOrderUser">Task/Job Orders User</Label>
              <Select>
                <SelectTrigger id="taskJobOrderUser">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="user1">User 1</SelectItem>
                    <SelectItem value="user2">User 2</SelectItem>
                    <SelectItem value="user3">User 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="constructionProject">Construction Project</Label>
              <Select>
                <SelectTrigger id="constructionProject">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="project1">Project 1</SelectItem>
                    <SelectItem value="project2">Project 2</SelectItem>
                    <SelectItem value="project3">Project 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <div className="mb-4">
              <Label htmlFor="analyticAccount">Analytic Account</Label>
              <Select>
                <SelectTrigger id="analyticAccount">
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="account1">Account 1</SelectItem>
                    <SelectItem value="account2">Account 2</SelectItem>
                    <SelectItem value="account3">Account 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input type="date" id="scheduledDate" />
            </div>
            <div className="mb-4">
              <Label htmlFor="sourceDocument">Source Document</Label>
              <Input type="text" id="sourceDocument" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="initialDemand" className="w-full">
          <TabsList>
            <TabsTrigger value="initialDemand">Initial Demand</TabsTrigger>
            <TabsTrigger value="additionalInfo">Additional Info</TabsTrigger>
          </TabsList>
          <TabsContent value="initialDemand">
            <div className="mt-4">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Product</th>
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
                        <input
                          type="text"
                          value={row.status}
                          onChange={(e) =>
                            handleInputChange(index, "status", e.target.value)
                          }
                          className="border rounded-md px-2 py-1 w-full"
                        />
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
          <TabsContent value="additionalInfo">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <Label htmlFor="deliveryType">Delivery Type</Label>
                  <Select>
                    <SelectTrigger id="deliveryType">
                      <SelectValue placeholder="Select delivery type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="type1">Type 1</SelectItem>
                        <SelectItem value="type2">Type 2</SelectItem>
                        <SelectItem value="type3">Type 3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <Label htmlFor="pickingType">Picking Type</Label>
                  <Select>
                    <SelectTrigger id="pickingType">
                      <SelectValue placeholder="Select picking type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="picking1">Picking 1</SelectItem>
                        <SelectItem value="picking2">Picking 2</SelectItem>
                        <SelectItem value="picking3">Picking 3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <Label htmlFor="procurementGroup">Procurement Group</Label>
                  <Select>
                    <SelectTrigger id="procurementGroup">
                      <SelectValue placeholder="Select procurement group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="group1">Group 1</SelectItem>
                        <SelectItem value="group2">Group 2</SelectItem>
                        <SelectItem value="group3">Group 3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default NewMaterialRequisitionForm;