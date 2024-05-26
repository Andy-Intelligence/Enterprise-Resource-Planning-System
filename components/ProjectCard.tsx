"use client";
import React from "react";
import { LuDiamond } from "react-icons/lu";
import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

const ProjectCard = () => {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between relative">
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <FaStar className="text-yellow-400" />
      </div>
      <div className="text-xl font-semibold mb-4">Project Title</div>
      <div className="flex flex-col items-start w-full mb-4">
        <div className="flex items-center justify-center">
          <span>Project Manager </span>
          <LuDot />
          <span className="flex items-center justify-center text-black text-sm">
            John Doe
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span>Contact </span>
          <LuDot />
          <span className="flex items-center justify-center text-black text-sm">
            johndoe@example.com
          </span>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <LuDiamond className="text-yellow-400" />
          <div className="flex items-center justify-center">
            <span>Tasks </span>
            <LuDot />
            <span className="flex items-center justify-center text-black text-sm">
              50
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span>Issues </span>
            <LuDot />
            <span className="flex items-center justify-center text-black text-sm">
              50
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span>FeedBack </span>
            <LuDot />
            <span className="flex items-center justify-center text-black text-sm">
              50
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
