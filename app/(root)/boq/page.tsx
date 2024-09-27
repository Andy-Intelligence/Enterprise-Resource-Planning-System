// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import BOQCard from "@/components/BOQCard";
// import { FiSearch, FiPlus } from "react-icons/fi";

// interface BOQ {
//   id: number;
//   project: string;
//   status: string;
//   estimatedCost: number;
// }

// const BOQsComponent = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   // Dummy data representing BOQs
//   const boqs: BOQ[] = [
//     { id: 1, project: "Project A", status: "Draft", estimatedCost: 50000 },
//     { id: 2, project: "Project B", status: "Confirmed", estimatedCost: 75000 },
//     { id: 3, project: "Project C", status: "Draft", estimatedCost: 60000 },
//     { id: 4, project: "Project D", status: "Confirmed", estimatedCost: 90000 },
//     { id: 5, project: "Project E", status: "Draft", estimatedCost: 45000 },
//     { id: 6, project: "Project F", status: "Confirmed", estimatedCost: 80000 },
//   ];

//   // Group BOQs by status
//   const groupedBOQs = boqs.reduce((acc, boq) => {
//     acc[boq.status] = [...(acc[boq.status] || []), boq];
//     return acc;
//   }, {} as Record<string, BOQ[]>);

//   const statusColors = {
//     Draft: "bg-yellow-100 text-yellow-800",
//     Confirmed: "bg-green-100 text-green-800",
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Bills of Quantity</h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//           onClick={() => router.push("/boq/create")}
//         >
//           <FiPlus /> Create BOQ
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//         <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
//           <FiSearch className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search BOQs..."
//             className="bg-transparent w-full focus:outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {Object.entries(groupedBOQs).map(([status, boqs]) => (
//             <div key={status} className="flex flex-col gap-y-4">
//               <h2
//                 className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${
//                   statusColors[status as keyof typeof statusColors]
//                 }`}
//               >
//                 {status}
//               </h2>
//               {boqs.map((boq) => (
//                 <Link key={boq.id} href={`/boq/${boq.id}`}>
//                   <BOQCard boq={boq} />
//                 </Link>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <nav className="inline-flex rounded-md shadow">
//           <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
//             Previous
//           </button>
//           <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50">
//             1
//           </button>
//           <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50">
//             2
//           </button>
//           <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
//             Next
//           </button>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default BOQsComponent;




"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";

interface BoqItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

const BoqComponent: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [boqItems, setBoqItems] = useState<BoqItem[]>([]);

  useEffect(() => {
    fetchBoqItems();
  }, []);

  const fetchBoqItems = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/boq/keys",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setBoqItems(response.data);
    } catch (error) {
      console.error("Error fetching BOQ items:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchBoqItems();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const filteredBoqItems = boqItems.filter(
    (item) =>
      (filterType === "" ||
        item.name.toLowerCase().includes(filterType.toLowerCase())) &&
      (searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">BOQ Items</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/boq/create")}
        >
          <FiPlus /> Create BOQ Item
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search BOQ items..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <FiFilter className="text-gray-400 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-100 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">All Items</option>
              {Array.from(new Set(boqItems.map((item) => item.name))).map(
                (name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Unit Price</th>
                <th className="py-3 px-4 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredBoqItems.map((item) => (
                <tr
                  key={item.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/boq/${item.id}`)}
                >
                  <td className="py-4 px-4 border-b">{item.name}</td>
                  <td className="py-4 px-4 border-b">{item.description}</td>
                  <td className="py-4 px-4 border-b">{item.quantity}</td>
                  <td className="py-4 px-4 border-b">
                    ${item.unit_price.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 border-b">
                    ${item.total_price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredBoqItems.length} of {boqItems.length} BOQ items
        </p>
        {/* Add pagination here if needed */}
      </div>
    </div>
  );
};

export default BoqComponent;