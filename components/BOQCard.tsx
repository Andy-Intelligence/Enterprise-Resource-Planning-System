"use client";

import React from "react";
import { FaBuilding, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";

const BOQCard = ({ boq }:any) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
          {boq.project}
        </h3>
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            boq.status === "Draft"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {boq.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <FaBuilding className="mr-2 text-blue-500" />
          <span className="text-sm">Project: {boq.project}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaMoneyBillWave className="mr-2 text-green-500" />
          <span className="text-sm">
            Estimated Cost: ${boq.estimatedCost.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <FaClipboardList className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">
            Items: {/* You can add the number of BOQ items here */}
          </span>
        </div>
        <span className="flex items-center text-sm text-blue-600">
          View Details →
        </span>
      </div>
    </div>
  );
};

export default BOQCard;
