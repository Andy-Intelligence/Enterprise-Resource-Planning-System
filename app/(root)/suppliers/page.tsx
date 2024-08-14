// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiSearch, FiPlus } from "react-icons/fi";

// interface Supplier {
//   supplierId: string;
//   supplierName: string;
//   address: string;
//   phoneNumber: string;
//   email: string;
// }

// const SupplierPage: React.FC = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   const suppliers: Supplier[] = [
//     {
//       supplierId: "SUP0001",
//       supplierName: "Delwire",
//       address: "Jumbo Street",
//       phoneNumber: "1234566",
//       email: "delwire@gmail.com",
//     },
//     {
//       supplierId: "SUP0002",
//       supplierName: "TechSupply Co.",
//       address: "123 Tech Avenue",
//       phoneNumber: "9876543",
//       email: "techsupply@example.com",
//     },
//     {
//       supplierId: "SUP0003",
//       supplierName: "Global Parts Inc.",
//       address: "456 Industrial Park",
//       phoneNumber: "5551234",
//       email: "info@globalparts.com",
//     },
//     // Add more suppliers as needed
//   ];

//   const filteredSuppliers = suppliers.filter(
//     (supplier) =>
//       searchQuery === "" ||
//       supplier.supplierId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Suppliers</h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//           onClick={() => router.push("/suppliers/create")}
//         >
//           <FiPlus /> Create Supplier
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
//             <FiSearch className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search suppliers..."
//               className="bg-transparent w-full focus:outline-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-4 text-left">Supplier ID</th>
//                 <th className="py-3 px-4 text-left">Supplier Name</th>
//                 <th className="py-3 px-4 text-left">Address</th>
//                 <th className="py-3 px-4 text-left">Phone Number</th>
//                 <th className="py-3 px-4 text-left">Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSuppliers.map((supplier) => (
//                 <tr
//                   key={supplier.supplierId}
//                   className="hover:bg-gray-50 transition-colors cursor-pointer"
//                   onClick={() =>
//                     router.push(`/suppliers/${supplier.supplierId}`)
//                   }
//                 >
//                   <td className="py-4 px-4 border-b">{supplier.supplierId}</td>
//                   <td className="py-4 px-4 border-b">
//                     {supplier.supplierName}
//                   </td>
//                   <td className="py-4 px-4 border-b">{supplier.address}</td>
//                   <td className="py-4 px-4 border-b">{supplier.phoneNumber}</td>
//                   <td className="py-4 px-4 border-b">{supplier.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <p className="text-gray-600">
//           Showing {filteredSuppliers.length} of {suppliers.length} suppliers
//         </p>
//         <div className="flex gap-2">
//           {[1, 2, 3].map((page) => (
//             <button
//               key={page}
//               className={`px-3 py-1 rounded ${
//                 page === 1
//                   ? "bg-blue-600 text-white"
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

// export default SupplierPage;


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus } from "react-icons/fi";
import axios from "axios";
import { getAccessToken } from "@/lib/utils";

interface Supplier {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const SupplierPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/suppliers/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      searchQuery === "" ||
      supplier.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Suppliers</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/suppliers/create")}
        >
          <FiPlus /> Create Supplier
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search suppliers..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Supplier ID</th>
                <th className="py-3 px-4 text-left">Supplier Name</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Phone Number</th>
                <th className="py-3 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/suppliers/${supplier.id}`)}
                >
                  <td className="py-4 px-4 border-b">{supplier.id}</td>
                  <td className="py-4 px-4 border-b">{supplier.name}</td>
                  <td className="py-4 px-4 border-b">{supplier.address}</td>
                  <td className="py-4 px-4 border-b">{supplier.phone}</td>
                  <td className="py-4 px-4 border-b">{supplier.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredSuppliers.length} of {suppliers.length} suppliers
        </p>
      </div>
    </div>
  );
};

export default SupplierPage;