// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";

// interface PurchaseOrder {
//   purchaseOrderCode: string;
//   vendorName: string;
//   purchaseOrderDate: string;
//   invoiceAmount: number;
//   status: string;
// }

// const PurchaseOrderPage: React.FC = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");

//   const purchaseOrders: PurchaseOrder[] = [
//     {
//       purchaseOrderCode: "PO/2022/00005",
//       purchaseOrderDate: "2022-05-11",
//       vendorName: "Apico",
//       invoiceAmount: 333.04,
//       status: "Pending",
//     },
//     {
//       purchaseOrderCode: "PO/2022/00006",
//       purchaseOrderDate: "2022-05-12",
//       vendorName: "Marina",
//       invoiceAmount: 733.04,
//       status: "Completed",
//     },
//     {
//       purchaseOrderCode: "PO/2022/00007",
//       purchaseOrderDate: "2022-05-13",
//       vendorName: "TechSupply",
//       invoiceAmount: 1250.99,
//       status: "In Progress",
//     },
//     // Add more purchase orders as needed
//   ];

//   const statusOptions = ["Pending", "In Progress", "Completed"];

//   const filteredPurchaseOrders = purchaseOrders.filter(
//     (po) =>
//       (filterStatus === "" || po.status === filterStatus) &&
//       (searchQuery === "" ||
//         po.purchaseOrderCode
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()) ||
//         po.vendorName.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Purchase Orders</h1>
//         <button
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
//           onClick={() => router.push("/purchase-order/create")}
//         >
//           <FiPlus /> Create Purchase Order
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
//             <FiSearch className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search purchase orders..."
//               className="bg-transparent w-full focus:outline-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center">
//             <FiFilter className="text-gray-400 mr-2" />
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="bg-gray-100 rounded-md px-3 py-2 focus:outline-none"
//             >
//               <option value="">All Statuses</option>
//               {statusOptions.map((status) => (
//                 <option key={status} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-4 text-left">Purchase Order Code</th>
//                 <th className="py-3 px-4 text-left">Purchase Order Date</th>
//                 <th className="py-3 px-4 text-left">Vendor Name</th>
//                 <th className="py-3 px-4 text-left">Invoice Amount</th>
//                 <th className="py-3 px-4 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPurchaseOrders.map((po, index) => (
//                 <tr
//                   key={po.purchaseOrderCode}
//                   className="cursor-pointer hover:bg-gray-50 transition-colors"
//                   onClick={() =>
//                     router.push(`/purchase-order/${po.purchaseOrderCode}`)
//                   }
//                 >
//                   <td className="py-4 px-4 border-b">{po.purchaseOrderCode}</td>
//                   <td className="py-4 px-4 border-b">{po.purchaseOrderDate}</td>
//                   <td className="py-4 px-4 border-b">{po.vendorName}</td>
//                   <td className="py-4 px-4 border-b">
//                     ${po.invoiceAmount.toFixed(2)}
//                   </td>
//                   <td className="py-4 px-4 border-b">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         po.status === "Completed"
//                           ? "bg-green-100 text-green-800"
//                           : po.status === "In Progress"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {po.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <p className="text-gray-600">
//           Showing {filteredPurchaseOrders.length} of {purchaseOrders.length}{" "}
//           purchase orders
//         </p>
//         <div className="flex gap-2">
//           {[1, 2, 3].map((page) => (
//             <button
//               key={page}
//               className={`px-3 py-1 rounded ${
//                 page === 1
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchaseOrderPage;




"use client"

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";
import axios from "axios";

interface PurchaseOrder {
  id: number;
  requisition: number;
  order_date: string;
  delivery_date: string;
  payment_terms: string;
  payment_due_date: string;
  shipping_method: string;
  delivery_address: string;
  approved_by: number;
  status: string;
}

const PurchaseOrderPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  const statusOptions = ["Pending", "In Progress", "Completed"];

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const getAccessToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  const getRefreshToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken");
    }
    return null;
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = getRefreshToken();
        const response = await axios.post(
          "https://erp-backend-nv09.onrender.com/api/auth/token/refresh/",
          {
            refresh: refreshToken,
          }
        );
        localStorage.setItem("accessToken", response.data.access);
        fetchPurchaseOrders();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        router.push("/sign-in");
      }
    }
  };

  const fetchPurchaseOrders = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/purchase/purchase-orders/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
      handleTokenRefresh(error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const filteredPurchaseOrders = purchaseOrders.filter(
    (po) =>
      (filterStatus === "" || po.status === filterStatus) &&
      (searchQuery === "" ||
        po.id.toString().includes(searchQuery.toLowerCase()) ||
        po.delivery_address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Purchase Orders</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/purchase-order/create")}
        >
          <FiPlus /> Create Purchase Order
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search purchase orders..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <FiFilter className="text-gray-400 mr-2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-100 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Order Date</th>
                <th className="py-3 px-4 text-left">Delivery Date</th>
                <th className="py-3 px-4 text-left">Delivery Address</th>
                <th className="py-3 px-4 text-left">Payment Terms</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchaseOrders.map((po) => (
                <tr
                  key={po.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/purchase-order/${po.id}`)}
                >
                  <td className="py-4 px-4 border-b">PO-{po.id}</td>
                  <td className="py-4 px-4 border-b">
                    {formatDate(po.order_date)}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {formatDate(po.delivery_date)}
                  </td>
                  <td className="py-4 px-4 border-b">{po.delivery_address}</td>
                  <td className="py-4 px-4 border-b">{po.payment_terms}</td>
                  <td className="py-4 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                        po.status
                      )}`}
                    >
                      {po.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredPurchaseOrders.length} of {purchaseOrders.length}{" "}
          purchase orders
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderPage;
