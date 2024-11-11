













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
  price: number; // Adding price field for each item
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
    { id: "1", product: "", quantity: 0, price: 0, status: "draft" },
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
    requested_by: "", // This will be handled on the backend
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

 const handleAddItem = (event:any) => {
  event.preventDefault()
   // Adding a new item with a unique id
   const newItem = {
     id: (initialDemand.length + 1).toString(), // Ensure a unique sequential ID
     product: "",
     quantity: 0,
     price: 0,
     status: "draft",
   };

   // Use functional state update to ensure we're working with the latest state
   setInitialDemand((prevState) => [...prevState, newItem]);

   // Debugging: Check if the state is updating correctly
   console.log("Item added:", newItem);
   console.log("Updated item list:", initialDemand);
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

      // Ensure that all required fields are filled
      if (!requisitionDetails.name) {
        setError("Requisition name cannot be blank.");
        setIsLoading(false);
        return;
      }

      // Prepare the items array with required fields
      const items = initialDemand.map((item) => ({
        item: item.product, // Assuming `product` is a placeholder for an item ID
        quantity: item.quantity,
        price: item.price || 0, // Ensure that price is sent, even if it's 0
        status: item.status,
      }));

      const requisitionResponse = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/purchase/requisitions/",
        {
          name: requisitionDetails.name, // Ensure name is sent
          project: parseInt(requisitionDetails.project), // Project ID
          task: parseInt(requisitionDetails.task), // Task ID
          description: requisitionDetails.description,
          schedule_date: requisitionDetails.schedule_date,
          requested_by: requisitionDetails.requested_by, // Backend will handle requested_by
          status: formStatus, // Approval status
          approval_status: formStatus, // Explicitly add approval status
          items: items, // Include items with the necessary fields
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
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
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
                  ? "bg-green-500 text-white"
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
              <Label htmlFor="name">Requisition Name</Label>
              <Input
                type="text"
                id="name"
                value={requisitionDetails.name}
                onChange={(e) =>
                  handleRequisitionDetailsChange("name", e.target.value)
                }
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Description"
                id="description"
                value={requisitionDetails.description}
                onChange={(e) =>
                  handleRequisitionDetailsChange("description", e.target.value)
                }
              />
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
                <SelectContent className="bg-gray-200">
                  <SelectGroup>
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

          <div className="mb-4">
            <Label htmlFor="schedule_date">Scheduled Date</Label>
            <Input
              type="date"
              id="schedule_date"
              value={requisitionDetails.schedule_date}
              onChange={(e) =>
                handleRequisitionDetailsChange("schedule_date", e.target.value)
              }
            />
          </div>
        </div>

        {/* Item Table */}
        <div className="space-y-4">
          {initialDemand.map((item, index) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor={`product-${item.id}`}>Product</Label>
                  <Input
                    type="text"
                    id={`product-${item.id}`}
                    value={item.product}
                    onChange={(e) =>
                      handleInputChange(index, "product", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                  <Input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", +e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`price-${item.id}`}>Price</Label>
                  <Input
                    type="number"
                    id={`price-${item.id}`}
                    value={item.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", +e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`status-${item.id}`}>Status</Label>
                  <Input
                    type="text"
                    id={`status-${item.id}`}
                    value={item.status}
                    onChange={(e) =>
                      handleInputChange(index, "status", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={handleAddItem}>Add New Item</Button>
        </div>
      </form>
    </div>
  );
};

export default NewMaterialRequisitionForm;
