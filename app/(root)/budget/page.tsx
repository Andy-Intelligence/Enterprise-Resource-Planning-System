// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

// interface Budget {
//   id: string;
//   budgetName: string;
//   startDate: string;
//   endDate: string;
//   responsible: string;
//   status: string;
// }

// const BudgetPage: React.FC = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   const budgets: Budget[] = [
//     {
//       id: "1",
//       budgetName: "Marketing Budget",
//       startDate: "2024-01-01",
//       endDate: "2024-12-31",
//       responsible: "John Doe",
//       status: "Active",
//     },
//     {
//       id: "2",
//       budgetName: "Development Budget",
//       startDate: "2024-01-01",
//       endDate: "2024-12-31",
//       responsible: "Jane Smith",
//       status: "Pending",
//     },
//     // Add more budget entries as needed
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "active":
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
//         <h1 className="text-3xl font-bold text-gray-800">Budgets</h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//           onClick={() => router.push("/budget/create")}
//         >
//           <FiPlus /> Create Budget
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
//             <FiSearch className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search budgets..."
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
//                   Budget Name
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Start Date
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   End Date
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Responsible
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {budgets.map((budget) => (
//                 <tr key={budget.id} className="hover:bg-gray-50">
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {budget.budgetName}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {budget.startDate}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {budget.endDate}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {budget.responsible}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                         budget.status
//                       )}`}
//                     >
//                       {budget.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900 mr-2"
//                       onClick={() => router.push(`/budget/${budget.id}`)}
//                     >
//                       <FiEdit2 />
//                     </button>
//                     <button className="text-red-600 hover:text-red-900">
//                       <FiTrash2 />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mt-4 flex items-center justify-between">
//         <div className="text-sm text-gray-700">
//           Showing <span className="font-medium">1</span> to{" "}
//           <span className="font-medium">{budgets.length}</span> of{" "}
//           <span className="font-medium">{budgets.length}</span> results
//         </div>
//         <div className="flex-1 flex justify-end">
//           <nav
//             className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//             aria-label="Pagination"
//           >
//             <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//               Previous
//             </button>
//             <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//               Next
//             </button>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BudgetPage;
"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";

interface Budget {
  id: number;
  project: number;
  budget_position: string;
  start_date: string;
  end_date: string;
  planned_amount: number;
  practical_amount: number;
  paid_amount: number;
  paid_date: string;
  status: string;
}

const BudgetPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://your-backend-url.com/api/budgets/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchBudgets();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        const accessToken = await getAccessToken();
        await axios.delete(`https://your-backend-url.com/api/budgets/${id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        fetchBudgets();
      } catch (error) {
        console.error("Error deleting budget:", error);
        handleTokenRefresh(error);
      }
    }
  };

  const filteredBudgets = budgets.filter((budget) =>
    budget.budget_position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
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
        <h1 className="text-3xl font-bold text-gray-800">Budgets</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/budget/create")}
        >
          <FiPlus /> Create Budget
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search budgets..."
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
                  Budget Position
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Planned Amount
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBudgets.map((budget) => (
                <tr key={budget.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap">
                    {budget.budget_position}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {budget.start_date}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {budget.end_date}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    ${budget.planned_amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        budget.status
                      )}`}
                    >
                      {budget.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                      onClick={() => router.push(`/budget/${budget.id}`)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(budget.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredBudgets.length}</span>{" "}
          of <span className="font-medium">{budgets.length}</span> results
        </div>
        {/* Add pagination here if needed */}
      </div>
    </div>
  );
};

export default BudgetPage;