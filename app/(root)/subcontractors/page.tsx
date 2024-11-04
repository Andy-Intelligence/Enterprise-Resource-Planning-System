"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SubContractorCard from "@/components/SubContractorCard";
import { FiSearch, FiPlus } from "react-icons/fi";

const SubContractorsComponent = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const subContractors = [
    { id: 1, name: "John Doe", specialty: "Electrical" },
    { id: 2, name: "Jane Smith", specialty: "Plumbing" },
    { id: 3, name: "Michael Johnson", specialty: "Carpentry" },
    // Add more subcontractors as needed
  ];

  // Dummy data for pagination
  const totalSubContractors = 50;
  const subContractorsPerPage = 9;
  const totalPages = Math.ceil(totalSubContractors / subContractorsPerPage);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Subcontractors</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/subcontractors/create")}
        >
          <FiPlus /> Create
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search subcontractors..."
            className="bg-transparent w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subContractors.map((subContractor) => (
            <SubContractorCard
              key={subContractor.id}
              id={subContractor.id} // Pass the id to the SubContractorCard component
              name={subContractor.name}
              specialty={subContractor.specialty}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {subContractorsPerPage} of {totalSubContractors}{" "}
          subcontractors
        </p>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                index === 0
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubContractorsComponent;
