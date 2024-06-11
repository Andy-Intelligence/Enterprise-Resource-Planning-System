"use client";

import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";

const ContractorCard: React.FC = () => {
  // Dummy data
  const imageUrl =
    "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_760/https://dutumgroup.com/wp-content/uploads/2024/03/image-4-760x507.png";
  const name = "Contractor Company";
  const location = "123 Main St, City, Country";
  const email = "contact@contractor.com";
  const numberOfProjects = 2;
  const amount = 50000;

  return (
    <div className="border rounded-lg p-4 flex flex-row items-center">
      <div className="w-1/4">
        <img src={imageUrl} alt={name} className="w-full h-auto object-cover" />
      </div>
      <div className="w-3/4 pl-4">
        <div className="text-xl font-semibold mb-2">{name}</div>
        <div className="text-gray-600 mb-1">{location}</div>
        <div className="text-gray-600 mb-2">{email}</div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <FaShoppingCart className="text-gray-600 mr-1" />
            <span>{numberOfProjects}</span>
          </div>
          <div className="flex items-center">
            <FaMoneyBillWave className="text-gray-600 mr-1" />
            <span>&#8358;{amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorCard;
