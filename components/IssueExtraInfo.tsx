"use client";
import React from "react";

const IssueExtraInfo = () => {
  return (
    <div className="flex justify-between mb-4 border rounded-lg p-4">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-4 border-r">
        <div className="mb-4">
          <label className="block text-sm font-semibold">ID</label>
          <div>4</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Days to Assign</label>
          <div>0</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Days to Close</label>
          <div>0</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-4">
        <div className="mb-4">
          <label className="block text-sm font-semibold">
            Working Hours to Assign the Issue
          </label>
          <div>0.00</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">
            Working Hours to Close the Issue
          </label>
          <div>0.00</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">
            Days Since Last Action
          </label>
          <div>5</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">
            Days Since Creation Date
          </label>
          <div>5</div>
        </div>
      </div>
    </div>
  );
};

export default IssueExtraInfo;
