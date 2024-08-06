"use client";
import React from "react";
import { FaStar, FaUser, FaExclamationCircle } from "react-icons/fa";

const IssueCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
          Issue Title
        </h3>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Open
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <FaUser className="mr-2 text-blue-500" />
          <span className="text-sm">Contact: Tecno</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaExclamationCircle className="mr-2 text-red-500" />
          <span className="text-sm">Priority:</span>
          <div className="flex ml-2">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-yellow-400 w-4 h-4" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <img
            src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg"
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
          />
          <span className="ml-2 text-sm text-gray-600">
            Assigned to: John Doe
          </span>
        </div>
        <span className="flex items-center text-sm text-green-600">
          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
          Active
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
