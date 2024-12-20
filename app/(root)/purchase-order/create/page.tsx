



// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { FiSave, FiX, FiPlus } from "react-icons/fi";
// import axios from "axios";
// import { getAccessToken, refreshAccessToken } from "@/lib/utils";

// interface ItemDetail {
//   id: string;
//   item: string;
//   quantity: number;
//   price: number;
//   status: string;
// }

// interface Project {
//   id: number;
//   name: string;
// }

// interface Task {
//   id: number;
//   name: string;
// }

// const statusOptions = [
//   { label: "Pending", value: "pending" },
//   { label: "Ordered", value: "ordered" },
//   { label: "Delivered", value: "delivered" },
// ];

// const CreatePurchaseOrder: React.FC = () => {
//   const router = useRouter();
//   const [purchaseItems, setPurchaseItems] = useState<ItemDetail[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [newItemDetail, setNewItemDetail] = useState<ItemDetail>({
//     id: "",
//     item: "",
//     quantity: 0,
//     price: 0,
//     status: "pending",
//   });
//   const [purchaseDetails, setPurchaseDetails] = useState({
//     name: "",
//     project: "",
//     description: "",
//     schedule_date: "",
//     payment_terms: "",
//     shipping_method: "",
//     delivery_address: "",
//     task: "",
//   });
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchProjects();
//     fetchTasks();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const accessToken = await getAccessToken();
//       const response = await axios.get(
//         "https://erp-backend-nv09.onrender.com/api/projects/",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       setProjects(response.data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       handleTokenRefresh(error);
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const accessToken = await getAccessToken();
//       const response = await axios.get(
//         "https://erp-backend-nv09.onrender.com/api/tasks/",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       handleTokenRefresh(error);
//     }
//   };

//   const handleTokenRefresh = async (error: any) => {
//     if (error.response && error.response.status === 401) {
//       try {
//         await refreshAccessToken();
//         fetchProjects();
//         fetchTasks();
//       } catch (refreshError) {
//         console.error("Error refreshing token:", refreshError);
//         setError("Session expired. Please log in again.");
//       }
//     }
//   };

//   const handleAddItem = () => {
//     setPurchaseItems([
//       ...purchaseItems,
//       { ...newItemDetail, id: (purchaseItems.length + 1).toString() },
//     ]);
//     setIsDialogOpen(false);
//     setNewItemDetail({
//       id: "",
//       item: "",
//       quantity: 0,
//       price: 0,
//       status: "pending",
//     });
//   };

//   const handleInputChange = (field: string, value: string | number) => {
//     setNewItemDetail({ ...newItemDetail, [field]: value });
//   };

//   const handlePurchaseDetailsChange = (field: string, value: string) => {
//     setPurchaseDetails({ ...purchaseDetails, [field]: value });
//   };

//   const handleSave = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const accessToken = await getAccessToken();

//       // First, create a purchase requisition
//       const requisitionResponse = await axios.post(
//         "https://erp-backend-nv09.onrender.com/api/purchase/requisitions/",
//         {
//           name: purchaseDetails.name,
//           project: parseInt(purchaseDetails.project),
//           description: purchaseDetails.description,
//           schedule_date: purchaseDetails.schedule_date,
//           items: purchaseItems.map((item) => ({
//             item: item.item,
//             quantity: item.quantity,
//             price: item.price,
//           })),
//           task: purchaseDetails.task, // Including task in the requisition
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       const requisitionId = requisitionResponse.data.id;

//       // Then, create a purchase order based on the requisition
//       const purchaseOrderResponse = await axios.post(
//         "https://erp-backend-nv09.onrender.com/api/purchase/purchase-orders/",
//         {
//           requisition: requisitionId,
//           order_date: new Date().toISOString(),
//           delivery_date: purchaseDetails.schedule_date,
//           payment_terms: purchaseDetails.payment_terms,
//           shipping_method: purchaseDetails.shipping_method,
//           delivery_address: purchaseDetails.delivery_address,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       console.log(
//         "Purchase Order created successfully:",
//         purchaseOrderResponse.data
//       );
//       router.push("/purchase-orders");
//     } catch (error) {
//       console.error("Error creating purchase order:", error);
//       handleTokenRefresh(error);
//       setError("Failed to create purchase order. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDiscard = () => {
//     router.push("/purchase-orders");
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Create Purchase Order
//         </h1>

//         {error && (
//           <div
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
//             role="alert"
//           >
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}

//         <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
//           <button
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
//             onClick={handleSave}
//             disabled={isLoading}
//           >
//             <FiSave /> {isLoading ? "Saving..." : "Save"}
//           </button>
//           <button
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
//             onClick={handleDiscard}
//           >
//             <FiX /> Discard
//           </button>
//         </div>

//         <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <FormField
//             label="Purchase Order Name"
//             name="name"
//             value={purchaseDetails.name}
//             onChange={(e) =>
//               handlePurchaseDetailsChange("name", e.target.value)
//             }
//           />
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Project
//             </label>
//             <select
//               name="project"
//               value={purchaseDetails.project}
//               onChange={(e) =>
//                 handlePurchaseDetailsChange("project", e.target.value)
//               }
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Project</option>
//               {projects.map((project) => (
//                 <option key={project.id} value={project.id}>
//                   {project.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Task Selection */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Task</label>
//             <select
//               name="task"
//               value={purchaseDetails.task}
//               onChange={(e) =>
//                 handlePurchaseDetailsChange("task", e.target.value)
//               }
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Task</option>
//               {tasks.map((task) => (
//                 <option key={task.id} value={task.id}>
//                   {task.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <FormField
//             label="Description"
//             name="description"
//             value={purchaseDetails.description}
//             onChange={(e) =>
//               handlePurchaseDetailsChange("description", e.target.value)
//             }
//           />
//           <FormField
//             label="Scheduled Date"
//             name="schedule_date"
//             type="date" // Updated to use date input
//             value={purchaseDetails.schedule_date}
//             onChange={(e) =>
//               handlePurchaseDetailsChange("schedule_date", e.target.value)
//             }
//           />
//           <FormField
//             label="Payment Terms"
//             name="payment_terms"
//             value={purchaseDetails.payment_terms}
//             onChange={(e) =>
//               handlePurchaseDetailsChange("payment_terms", e.target.value)
//             }
//           />
//           <FormField
//             label="Shipping Method"
//             name="shipping_method"
//             value={purchaseDetails.shipping_method}
//             onChange={(e) =>
//               handlePurchaseDetailsChange("shipping_method", e.target.value)
//             }
//           />
//           <FormField
//             label="Delivery Address"
//             name="delivery_address"
//             value={purchaseDetails.delivery_address}
//             onChange={(e) =>
//               handlePurchaseDetailsChange("delivery_address", e.target.value)
//             }
//           />
//         </form>

//         {/* Render Items in a Table */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Items</h2>
//           <table className="min-w-full bg-white border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border">Item</th>
//                 <th className="px-4 py-2 border">Quantity</th>
//                 <th className="px-4 py-2 border">Price</th>
//                 <th className="px-4 py-2 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {purchaseItems.map((item) => (
//                 <tr key={item.id}>
//                   <td className="px-4 py-2 border">{item.item}</td>
//                   <td className="px-4 py-2 border">{item.quantity}</td>
//                   <td className="px-4 py-2 border">${item.price.toFixed(2)}</td>
//                   <td className="px-4 py-2 border">{item.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Add New Item Dialog */}
//         <div>
//           <button
//             className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
//             onClick={() => setIsDialogOpen(true)}
//           >
//             <FiPlus /> Add Item
//           </button>

//           {isDialogOpen && (
//             <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//               <div className="bg-white p-6 rounded-lg">
//                 <h3 className="text-lg font-bold mb-4">Add New Item</h3>
//                 <form className="grid grid-cols-1 gap-4">
//                   <FormField
//                     label="Item"
//                     name="item"
//                     value={newItemDetail.item}
//                     onChange={(e) =>
//                       handleInputChange("item", e.target.value)
//                     }
//                   />
//                   <FormField
//                     label="Quantity"
//                     name="quantity"
//                     type="number"
//                     value={newItemDetail.quantity}
//                     onChange={(e) =>
//                       handleInputChange("quantity", parseInt(e.target.value))
//                     }
//                   />
//                   <FormField
//                     label="Price"
//                     name="price"
//                     type="number"
//                     value={newItemDetail.price}
//                     onChange={(e) =>
//                       handleInputChange("price", parseFloat(e.target.value))
//                     }
//                   />
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">
//                       Status
//                     </label>
//                     <select
//                       name="status"
//                       value={newItemDetail.status}
//                       onChange={(e) =>
//                         handleInputChange("status", e.target.value)
//                       }
//                       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     >
//                       {statusOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </form>

//                 <div className="mt-4 flex justify-end gap-2">
//                   <button
//                     className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                     onClick={handleAddItem}
//                   >
//                     Add
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                     onClick={() => setIsDialogOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface FormFieldProps {
//   label: string;
//   name: string;
//   type?: string;
//   value: string | number;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }

// const FormField: React.FC<FormFieldProps> = ({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
// }) => (
//   <div>
//     <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
//       {label}
//     </label>
//     <input
//       id={name}
//       name={name}
//       type={type}
//       value={value}
//       onChange={onChange}
//       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// );

// export default CreatePurchaseOrder;




"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX, FiPlus } from "react-icons/fi";
import axios from "axios";

interface ItemDetail {
  id: string;
  item: string;
  quantity: number;
  price: number;
  status: string;
}

interface Project {
  id: number;
  name: string;
}

interface Task {
  id: number;
  name: string;
}

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Ordered", value: "ordered" },
  { label: "Delivered", value: "delivered" },
];

const API_BASE_URL = "https://erp-backend-nv09.onrender.com/api";

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const CreatePurchaseOrder: React.FC = () => {
  const router = useRouter();
  const [purchaseItems, setPurchaseItems] = useState<ItemDetail[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItemDetail, setNewItemDetail] = useState<ItemDetail>({
    id: "",
    item: "",
    quantity: 0,
    price: 0,
    status: "pending",
  });
  const [purchaseDetails, setPurchaseDetails] = useState({
    name: "",
    project: "",
    description: "",
    schedule_date: "",
    payment_terms: "",
    shipping_method: "",
    delivery_address: "",
    task: "",
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = getRefreshToken();
        const response = await axios.post(
          `${API_BASE_URL}/auth/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );
        localStorage.setItem("accessToken", response.data.access);
        return true;
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        router.push("/sign-in");
        return false;
      }
    }
    return false;
  };

const makeAuthenticatedRequest = async (
  requestFn: () => Promise<any>, // Type of request function
  retryCount = 0
): Promise<any> => {
  // Specify the return type as Promise<any>
  try {
    const accessToken = getAccessToken();
    const response = await requestFn();
    return response;
  } catch (error: any) {
    if (error.response?.status === 401 && retryCount === 0) {
      const refreshed = await handleTokenRefresh(error);
      if (refreshed) {
        return makeAuthenticatedRequest(requestFn, retryCount + 1);
      }
    }
    throw error;
  }
};


  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await makeAuthenticatedRequest(() =>
        axios.get(`${API_BASE_URL}/projects/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects.");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await makeAuthenticatedRequest(() =>
        axios.get(`${API_BASE_URL}/projects/tasks/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks.");
    }
  };

  const handleAddItem = () => {
    setPurchaseItems([
      ...purchaseItems,
      { ...newItemDetail, id: (purchaseItems.length + 1).toString() },
    ]);
    setIsDialogOpen(false);
    setNewItemDetail({
      id: "",
      item: "",
      quantity: 0,
      price: 0,
      status: "pending",
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewItemDetail({ ...newItemDetail, [field]: value });
  };

  const handlePurchaseDetailsChange = (field: string, value: string) => {
    setPurchaseDetails({ ...purchaseDetails, [field]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // First, create a purchase requisition
      const requisitionResponse = await makeAuthenticatedRequest(() =>
        axios.post(
          `${API_BASE_URL}/purchase/requisitions/`,
          {
            name: purchaseDetails.name,
            project: parseInt(purchaseDetails.project),
            description: purchaseDetails.description,
            schedule_date: purchaseDetails.schedule_date,
            items: purchaseItems.map((item) => ({
              item: item.item,
              quantity: item.quantity,
              price: item.price,
            })),
            task: purchaseDetails.task,
          },
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        )
      );

      const requisitionId = requisitionResponse.data.id;

      // Then, create a purchase order based on the requisition
      await makeAuthenticatedRequest(() =>
        axios.post(
          `${API_BASE_URL}/purchase/purchase-orders/`,
          {
            requisition: requisitionId,
            order_date: new Date().toISOString(),
            delivery_date: purchaseDetails.schedule_date,
            payment_terms: purchaseDetails.payment_terms,
            shipping_method: purchaseDetails.shipping_method,
            delivery_address: purchaseDetails.delivery_address,
          },
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        )
      );

      router.push("/purchase-orders");
    } catch (error) {
      console.error("Error creating purchase order:", error);
      setError("Failed to create purchase order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    router.push("/purchase-orders");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Purchase Order
        </h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleSave}
            disabled={isLoading}
          >
            <FiSave /> {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            onClick={handleDiscard}
          >
            <FiX /> Discard
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FormField
            label="Purchase Order Name"
            name="name"
            value={purchaseDetails.name}
            onChange={(e) =>
              handlePurchaseDetailsChange("name", e.target.value)
            }
          />
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project
            </label>
            <select
              name="project"
              value={purchaseDetails.project}
              onChange={(e) =>
                handlePurchaseDetailsChange("project", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Task</label>
            <select
              name="task"
              value={purchaseDetails.task}
              onChange={(e) =>
                handlePurchaseDetailsChange("task", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Task</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.name}
                </option>
              ))}
            </select>
          </div>

          <FormField
            label="Description"
            name="description"
            value={purchaseDetails.description}
            onChange={(e) =>
              handlePurchaseDetailsChange("description", e.target.value)
            }
          />
          <FormField
            label="Scheduled Date"
            name="schedule_date"
            type="date"
            value={purchaseDetails.schedule_date}
            onChange={(e) =>
              handlePurchaseDetailsChange("schedule_date", e.target.value)
            }
          />
          <FormField
            label="Payment Terms"
            name="payment_terms"
            value={purchaseDetails.payment_terms}
            onChange={(e) =>
              handlePurchaseDetailsChange("payment_terms", e.target.value)
            }
          />
          <FormField
            label="Shipping Method"
            name="shipping_method"
            value={purchaseDetails.shipping_method}
            onChange={(e) =>
              handlePurchaseDetailsChange("shipping_method", e.target.value)
            }
          />
          <FormField
            label="Delivery Address"
            name="delivery_address"
            value={purchaseDetails.delivery_address}
            onChange={(e) =>
              handlePurchaseDetailsChange("delivery_address", e.target.value)
            }
          />
        </form>

        {/* Items Table */}
        <div>
          <h2 className="text-xl font-bold mb-4">Items</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Item</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border">{item.item}</td>
                  <td className="px-4 py-2 border">{item.quantity}</td>
                  <td className="px-4 py-2 border">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2 border">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Item Dialog */}
        <div>
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={() => setIsDialogOpen(true)}
          >
            <FiPlus /> Add Item
          </button>

          {isDialogOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Add New Item</h3>
                <form className="grid grid-cols-1 gap-4">
                  <FormField
                    label="Item"
                    name="item"
                    value={newItemDetail.item}
                    onChange={(e) =>
                      handleInputChange("item", e.target.value)
                    }
                  />
                  <FormField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={newItemDetail.quantity}
                    onChange={(e) =>
                      handleInputChange("quantity", parseInt(e.target.value))
                    }
                  />
                  <FormField
                    label="Price"
                    name="price"
                    type="number"
                    value={newItemDetail.price}
                    onChange={(e) =>
                      handleInputChange("price", parseFloat(e.target.value))
                    }
                  />
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={newItemDetail.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={handleAddItem}
                  >
                    Add
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}



export default CreatePurchaseOrder;
