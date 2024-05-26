"use client";
import React from "react";
import { FaCircle } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

const IssueCard = () => {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between relative">
      <div className="text-xl font-semibold mb-4">Issue Title</div>
      <div className="flex flex-col items-start w-full mb-4">
        <div className="flex items-center justify-center">
          <span>Contact </span>
          <LuDot />
          <span className="flex items-center justify-center text-black text-sm">
            Tecno
          </span>
        </div>

        <div className="flex items-center justify-center">
          <span>Priority </span>
          <LuDot />
          <span className="flex items-center justify-center text-black text-sm">
            <FaStar className="text-yellow-400 mr-1" />
            <FaStar className="text-yellow-400 mr-1" />
            <FaStar className="text-yellow-400 mr-1" />
            <FaStar className="text-yellow-400" />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <FaCircle className="text-green-500" />
        <img
          src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg"
          alt="Avatar"
          className="object-cover w-8 h-8 rounded-full mr-2"
        />
      </div>
    </div>
  );
};

export default IssueCard;
