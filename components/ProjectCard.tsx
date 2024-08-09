"use client";

import React from "react";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import Image from "next/image";

const ContractorCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  // Dummy data
  const imageUrl =
    "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_760/https://dutumgroup.com/wp-content/uploads/2024/03/image-4-760x507.png";
  const name = "Contractor Company";
  const location = "123 Main St, City, Country";
  const email = "contact@contractor.com";
  const numberOfProjects = 2;
  const amount = 50000;

  return (
    <div
      onClick={onClick}
      className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300 hover:opacity-90"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaEnvelope className="mr-2 text-blue-500" />
            <a
              href={`mailto:${email}`}
              className="hover:text-blue-500 transition-colors"
            >
              {email}
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <FaShoppingCart className="text-green-500 mr-2" />
            <span className="font-semibold text-gray-700">
              {numberOfProjects}
            </span>
            <span className="ml-1 text-gray-600">Projects</span>
          </div>
          <div className="flex items-center">
            <FaMoneyBillWave className="text-green-500 mr-2" />
            <span className="font-semibold text-gray-700">
              &#8358;{amount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorCard;
