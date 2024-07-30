"use client";
import React from "react";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

const SiteCard = () => {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between relative">
      <div className="text-xl font-semibold mb-4">Project Title</div>
      <div className="mb-4 relative w-full h-48">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg"
          alt="Site Image"
          // layout="fill"
          // objectFit="cover"
          className="rounded-lg object-cover fill-inherit"
        />
      </div>
      <div className="flex flex-col items-start w-full mb-4 mt-4">
        <div className="flex items-center justify-center">
          <span>Address </span>
          <LuDot />
          <span className="flex items-center justify-center text-black text-sm">
            No.6 ekanem street
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span>Deadline </span>
          <LuDot />
          <span className="flex items-center justify-center text-black text-sm">
            12/17/2030
          </span>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;
