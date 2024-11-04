
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FiSearch,
//   FiPlus,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";

// interface MaterialRequisition {
//   id: number;
//   reference: string;
//   destination: string;
//   partner: string;
//   scheduledDate: string;
//   sourceDocument: string;
//   backOrderOf: string;
//   status: string;
// }

// const MaterialRequisitionPage: React.FC = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   const requisitionData: MaterialRequisition[] = [
//     {
//       id: 1,
//       reference: "REF123",
//       destination: "Zone 1",
//       partner: "Partner A",
//       scheduledDate: "2024-05-20",
//       sourceDocument: "DOC123",
//       backOrderOf: "BO123",
//       status: "Pending",
//     },
//     {
//       id: 2,
//       reference: "REF456",
//       destination: "Zone 2",
//       partner: "Partner B",
//       scheduledDate: "2024-05-21",
//       sourceDocument: "DOC456",
//       backOrderOf: "BO456",
//       status: "Completed",
//     },
//     // Add more rows as needed
//   ];

//   const filteredRequisitions = requisitionData.filter(
//     (requisition) =>
//       searchQuery === "" ||
//       requisition.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       requisition.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       requisition.status.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "completed":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Material Requisition
//         </h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//           onClick={() => router.push("/material-requisition/create")}
//         >
//           <FiPlus /> Create Requisition
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
//             <FiSearch className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search requisitions..."
//               className="bg-transparent w-full focus:outline-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Reference
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Destination Zone
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Partner
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Scheduled Date
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Source Document
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Back Order Of
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredRequisitions.map((requisition) => (
//                 <tr
//                   key={requisition.id}
//                   className="hover:bg-gray-50 cursor-pointer"
//                   onClick={() =>
//                     router.push(`/material-requisition/${requisition.id}`)
//                   }
//                 >
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {requisition.reference}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {requisition.destination}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {requisition.partner}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {requisition.scheduledDate}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {requisition.sourceDocument}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {requisition.backOrderOf}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                         requisition.status
//                       )}`}
//                     >
//                       {requisition.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mt-4 flex items-center justify-between">
//         <div className="text-sm text-gray-700">
//           Showing{" "}
//           <span className="font-medium">{filteredRequisitions.length}</span> of{" "}
//           <span className="font-medium">{requisitionData.length}</span>{" "}
//           requisitions
//         </div>
//         <div className="flex-1 flex justify-end">
//           <nav
//             className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//             aria-label="Pagination"
//           >
//             <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//               <FiChevronLeft className="h-5 w-5" />
//             </button>
//             <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//               1
//             </button>
//             <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//               2
//             </button>
//             <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//               3
//             </button>
//             <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//               <FiChevronRight className="h-5 w-5" />
//             </button>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MaterialRequisitionPage;





"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";

interface MaterialRequisition {
  id: number;
  reference: string;
  destination: string;
  partner: string;
  scheduledDate: string;
  sourceDocument: string;
  backOrderOf: string;
  status: string;
}

const MaterialRequisitionPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [requisitions, setRequisitions] = useState<MaterialRequisition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRequisitions();
  }, [currentPage]);

  const fetchRequisitions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        `https://erp-backend-nv09.onrender.com/api/material-requisitions/?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setRequisitions(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 items per page
    } catch (error) {
      console.error("Error fetching material requisitions:", error);
      handleTokenRefresh(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchRequisitions();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        setError("Session expired. Please log in again.");
      }
    } else {
      setError("Failed to fetch material requisitions. Please try again.");
    }
  };

  const handleCreateRequisition = () => {
    router.push("/material-requisition/create");
  };

  const handleRequisitionClick = (id: number) => {
    router.push(`/material-requisition/${id}`);
  };

  const filteredRequisitions = requisitions.filter(
    (requisition) =>
      searchQuery === "" ||
      requisition.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      requisition.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      requisition.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Material Requisition
        </h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          onClick={handleCreateRequisition}
        >
          <FiPlus /> Create Requisition
        </button>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search requisitions..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination Zone
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source Document
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Back Order Of
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : filteredRequisitions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No requisitions found
                  </td>
                </tr>
              ) : (
                filteredRequisitions.map((requisition) => (
                  <tr
                    key={requisition.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRequisitionClick(requisition.id)}
                  >
                    <td className="py-4 px-4 whitespace-nowrap">
                      {requisition.reference}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {requisition.destination}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {requisition.partner}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {requisition.scheduledDate}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {requisition.sourceDocument}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {requisition.backOrderOf}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          requisition.status
                        )}`}
                      >
                        {requisition.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{filteredRequisitions.length}</span> of{" "}
          <span className="font-medium">{requisitions.length}</span>{" "}
          requisitions
        </div>
        <div className="flex-1 flex justify-end">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === index + 1
                    ? "bg-blue-50 text-green-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MaterialRequisitionPage;