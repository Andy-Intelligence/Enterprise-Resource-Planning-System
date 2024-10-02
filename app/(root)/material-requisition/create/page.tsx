


"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";
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

interface Project {
  id: number;
  name: string;
}

interface Task {
  id: number;
  name: string;
}

interface ItemDetail {
  id: string;
  product: string;
  quantity: number;
  status: string;
}

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const NewMaterialRequisitionForm: React.FC = () => {
  const router = useRouter();
  const [initialDemand, setInitialDemand] = useState<ItemDetail[]>([
    { id: "1", product: "", quantity: 0, status: "draft" },
  ]);
  const [formStatus, setFormStatus] = useState("draft");
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [requisitionDetails, setRequisitionDetails] = useState({
    name: "",
    project: "",
    task: "",
    description: "",
    schedule_date: "",
    requested_by: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/projects/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      handleTokenRefresh(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/projects/tasks/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchProjects();
        fetchTasks();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        setError("Session expired. Please log in again.");
      }
    }
  };

  const handleAddItem = () => {
    setInitialDemand([
      ...initialDemand,
      {
        id: (initialDemand.length + 1).toString(),
        product: "",
        quantity: 0,
        status: "draft",
      },
    ]);
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newData = initialDemand.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setInitialDemand(newData);
  };

  const handleRequisitionDetailsChange = (field: string, value: string) => {
    setRequisitionDetails({ ...requisitionDetails, [field]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();

      const requisitionResponse = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/purchase/requisitions/",
        {
          name: requisitionDetails.name,
          project: parseInt(requisitionDetails.project),
          task: parseInt(requisitionDetails.task),
          description: requisitionDetails.description,
          schedule_date: requisitionDetails.schedule_date,
          requested_by: requisitionDetails.requested_by,
          status: formStatus,
          items: initialDemand.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            status: item.status,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(
        "Material Requisition created successfully:",
        requisitionResponse.data
      );
      router.push("/material-requisitions");
    } catch (error) {
      console.error("Error creating material requisition:", error);
      handleTokenRefresh(error);
      setError("Failed to create material requisition. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    router.push("/material-requisitions");
  };

  return (
    <div className="border rounded-lg p-4 relative">
      <div className="text-3xl font-bold mb-4">Requisition / New</div>
      <div className="flex gap-2 items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            variant="outline"
            onClick={handleDiscard}
          >
            Discard
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

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="mb-4">
              <Label htmlFor="requestedBy">Request By</Label>
              <Input
                type="text"
                id="requestedBy"
                value={requisitionDetails.requested_by}
                onChange={(e) =>
                  handleRequisitionDetailsChange("requested_by", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Description"
                  id="description"
                  value={requisitionDetails.description}
                  onChange={(e) =>
                    handleRequisitionDetailsChange(
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="task">Task</Label>
              <Select
                onValueChange={(value) =>
                  handleRequisitionDetailsChange("task", value)
                }
              >
                <SelectTrigger id="task">
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent className="bg-gray-200">
                  <SelectGroup>
                    {tasks.map((task) => (
                      <SelectItem key={task.id} value={task.id.toString()}>
                        {task.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="project">Project</Label>
              <Select
                onValueChange={(value) =>
                  handleRequisitionDetailsChange("project", value)
                }
              >
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="bg-gray-200">
                    {projects.map((project) => (
                      <SelectItem
                        key={project.id}
                        value={project.id.toString()}
                      >
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input
                type="date"
                id="scheduledDate"
                value={requisitionDetails.schedule_date}
                onChange={(e) =>
                  handleRequisitionDetailsChange(
                    "schedule_date",
                    e.target.value
                  )
                }
              />
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
                    <tr key={row.id}>
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
                            handleInputChange(
                              index,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Select
                          onValueChange={(value) =>
                            handleInputChange(index, "status", value)
                          }
                        >
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